import TravelPurposeModel from "../models/TravelPurposeModel.js"
export const TravelPurposeController = async (req, res) => {
    try {
        const vrid = req.params.vrid; // ID from URL
        const { category, specific_purpose } = req.body;

        if (!vrid) {
            return res.status(400).json({ message: "Visa ID is required in URL" });
        }

        // 1. Use the URL ID for BOTH the filter and the data
        // 2. This ensures we are always targeting the same unique record
        const updatedDoc = await TravelPurposeModel.findOneAndUpdate(
            { visa_request_id: vrid }, // Filter: Find the existing record for this visa
            { 
                visa_request_id: vrid,  // Data: Ensure ID stays consistent
                category, 
                specific_purpose 
            },
            { 
                upsert: true, // If not found, create it
                new: true,    // Return the updated version
                runValidators: true 
            }
        );

        // 3. Fetch the updated list
        const allList = await TravelPurposeModel.find();
        return res.status(200).json(allList);

    } catch (error) {
        // If a duplicate error happens despite findOneAndUpdate (rare race condition)
        if (error.code === 11000) {
            return res.status(409).json({ 
                message: "This Visa Request already has a Travel Purpose assigned." 
            });
        }
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

export const GetTravelPurposeController = async (req, res) => {
    try {
        const { vrid } = req.params;

        // 1. Validation: Ensure ID is provided
        if (!vrid || vrid === 'undefined') {
            return res.status(400).json({ message: "Visa Request ID is required" });
        }

        // 2. Find the document linked to this specific visa request
        // Using .lean() makes the query faster if you only need the data for reading
        const travelPurpose = await TravelPurposeModel.findOne({ visa_request_id: vrid });

        // 3. Handle 'Not Found' 
        // Note: For a form, you might want to return an empty object {} instead of a 404
        // so the frontend doesn't crash.
        if (!travelPurpose) {
            return res.status(200).json({ 
                message: "No travel purpose found for this request",
                data: null 
            });
        }

        // 4. Success Response
        return res.status(200).json(travelPurpose);

    } catch (error) {
        // Handle malformed MongoDB ObjectIDs
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid Visa ID format" });
        }
        
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

export const DeleteTravelPurposeController = async (req, res) => {
    try {
        const { vrid } = req.params;

        // 1. Validation
        if (!vrid || vrid === 'undefined') {
            return res.status(400).json({ message: "Visa Request ID is required for deletion." });
        }

        // 2. Perform Deletion 
        // We use findOneAndDelete because we are searching by the reference field (visa_request_id),
        // not the primary _id of the travel purpose document itself.
        const deletedDoc = await TravelPurposeModel.findOneAndDelete({ visa_request_id: vrid });

        // 3. Check if document existed
        if (!deletedDoc) {
            return res.status(404).json({ 
                message: "No travel purpose found for this Visa Request ID." 
            });
        }

        // 4. Success Response
        // Usually, it's helpful to return the ID of the deleted item so the frontend can update state.
        return res.status(200).json({
            success: true,
            message: "Travel purpose deleted successfully",
            deletedId: deletedDoc._id
        });

    } catch (error) {
        // Handle invalid MongoDB ID formats
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid ID format provided." });
        }

        return res.status(500).json({ 
            message: "Internal Server Error during deletion", 
            error: error.message 
        });
    }
};