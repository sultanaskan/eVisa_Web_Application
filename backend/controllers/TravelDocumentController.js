import TravelDocumentModel from '../models/TravelDocumentModel.js';


export const UpsertTravelDocumentController = async (req, res) => {
    try {
        const { vrid } = req.params;
        const { travel_document_info } = req.body;

        const updatedDoc = await TravelDocumentModel.findOneAndUpdate(
            { visa_request_id: vrid },
            { visa_request_id: vrid, travel_document_info },
            { upsert: true, new: true, runValidators: true }
        );

        return res.status(200).json(updatedDoc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const GetTravelDocumentController = async (req, res) => {
    try {
        const { vrid } = req.params;

        // 1. Validation: Ensure the ID is present
        if (!vrid || vrid === 'undefined') {
            return res.status(400).json({ 
                message: "Visa Request ID (vrid) is required." 
            });
        }

        // 2. Search by the reference field: visa_request_id
        const travelDocData = await TravelDocumentModel.findOne({ visa_request_id: vrid });

        // 3. Handle 'Not Found' gracefully
        // Return 200 with null so the frontend knows to show an empty form
        if (!travelDocData) {
            return res.status(200).json({ 
                message: "No travel document information found for this request.",
                data: null 
            });
        }

        // 4. Success Response
        return res.status(200).json(travelDocData);

    } catch (error) {
        // Handle malformed MongoDB IDs
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid ID format." });
        }

        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};




export const DeleteTravelDocumentController = async (req, res) => {
    try {
        const { vrid } = req.params;

        // 1. Validation
        if (!vrid || vrid === 'undefined') {
            return res.status(400).json({ 
                message: "Visa Request ID (vrid) is required for deletion." 
            });
        }

        // 2. Perform the deletion
        // We target the reference field 'visa_request_id'
        const deletedDoc = await TravelDocumentModel.findOneAndDelete({ visa_request_id: vrid });

        // 3. Handle case where record doesn't exist
        if (!deletedDoc) {
            return res.status(404).json({ 
                message: "No travel document information found to delete for this ID." 
            });
        }

        // 4. Success Response
        return res.status(200).json({
            success: true,
            message: "Travel document information deleted successfully.",
            deletedId: deletedDoc._id
        });

    } catch (error) {
        // Handle malformed IDs
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid ID format." });
        }

        return res.status(500).json({ 
            message: "Internal Server Error during deletion.", 
            error: error.message 
        });
    }
};