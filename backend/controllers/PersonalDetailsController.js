import PersonalDetailsModel from '../models/PersonalDeatilsModel.js';

export const PersonalDetailsController = async (req, res) => {
    try {
        const vrid = req.params.vrid; 
        
        // Extract personal_information from the request body
        const { personal_information } = req.body;

        if (!vrid) {
            return res.status(400).json({ message: "Visa ID (vrid) is required in the URL parameters." });
        }

        if (!personal_information) {
            return res.status(400).json({ message: "Personal information data is missing from the request body." });
        }

        // Use findOneAndUpdate with upsert: true
        // This finds the record by visa_request_id and updates it, or creates it if it doesn't exist
        const updatedDoc = await PersonalDetailsModel.findOneAndUpdate(
            { visa_request_id: vrid }, 
            { 
                visa_request_id: vrid, 
                personal_information // This includes family_data and employment_information
            },
            { 
                upsert: true, 
                new: true, 
                runValidators: true 
            }
        );

        // Usually, for personal details, we return the single updated document 
        // rather than the whole list of all users' details.
        return res.status(200).json(updatedDoc);

    } catch (error) {
        // Handle MongoDB unique constraint error
        if (error.code === 11000) {
            return res.status(409).json({ 
                message: "Personal details already exist for this Visa Request ID." 
            });
        }
        
        res.status(500).json({ 
            message: "Internal Server Error: " + error.message 
        });
    }
};


export const GetPersonalDetailsController = async (req, res) => {
    try {
        const { vrid } = req.params;

        // 1. Validation: Check if the ID is provided
        if (!vrid || vrid === 'undefined') {
            return res.status(400).json({ message: "Visa Request ID is required to fetch details." });
        }

        // 2. Fetch the data
        // We search by the reference field 'visa_request_id'
        const personalDetails = await PersonalDetailsModel.findOne({ visa_request_id: vrid });

        // 3. Handle the case where no details have been saved yet
        if (!personalDetails) {
            return res.status(200).json({ 
                message: "No personal details found for this request.",
                data: null 
            });
        }

        // 4. Success Response
        return res.status(200).json(personalDetails);

    } catch (error) {
        // Handle malformed MongoDB IDs
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid ID format provided." });
        }

        return res.status(500).json({ 
            message: "Internal Server Error while fetching personal details.", 
            error: error.message 
        });
    }
};





export const DeletePersonalDetailsController = async (req, res) => {
    try {
        const { vrid } = req.params;

        // 1. Validation
        if (!vrid || vrid === 'undefined') {
            return res.status(400).json({ message: "Visa Request ID (vrid) is required for deletion." });
        }

        // 2. Delete the record
        // We use findOneAndDelete because we are matching the 'visa_request_id' field
        const deletedDoc = await PersonalDetailsModel.findOneAndDelete({ visa_request_id: vrid });

        // 3. Check if the document actually existed
        if (!deletedDoc) {
            return res.status(404).json({ 
                message: "No personal details found for this Visa Request ID." 
            });
        }

        // 4. Success Response
        return res.status(200).json({
            success: true,
            message: "Personal details deleted successfully.",
            deletedId: deletedDoc._id
        });

    } catch (error) {
        // Handle malformed MongoDB IDs
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid ID format provided." });
        }

        return res.status(500).json({ 
            message: "Internal Server Error during deletion.", 
            error: error.message 
        });
    }
};