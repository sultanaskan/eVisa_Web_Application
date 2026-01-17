import VisaInformationModel from '../models/VisaInformationModel.js';

export const UpsertVisaInfoController = async (req, res) => {
    try {
        const { vrid } = req.params;
        const { visa_information } = req.body;

        if (!vrid) {
            return res.status(400).json({ message: "Visa ID (vrid) is required." });
        }

        const updatedDoc = await VisaInformationModel.findOneAndUpdate(
            { visa_request_id: vrid },
            { 
                visa_request_id: vrid, 
                visa_information 
            },
            { 
                upsert: true, 
                new: true, 
                runValidators: true 
            }
        );

        return res.status(200).json(updatedDoc);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Visa information already exists for this ID." });
        }
        res.status(500).json({ message: "Server error: " + error.message });
    }
};


export const GetVisaInfoController = async (req, res) => {
    try {
        const { vrid } = req.params;
        const visaInfo = await VisaInformationModel.findOne({ visa_request_id: vrid });
        if (!visaInfo) {
            return res.status(200).json({ 
                message: "No visa information found.",
                data: null 
            });
        }
        return res.status(200).json(visaInfo);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data: " + error.message });
    }
};


export const DeleteVisaInfoController = async (req, res) => {
    try {
        const { vrid } = req.params;
        const deletedDoc = await VisaInformationModel.findOneAndDelete({ visa_request_id: vrid });
        if (!deletedDoc) {
            return res.status(404).json({ message: "Record not found." });
        }
        return res.status(200).json({
            success: true,
            message: "Visa information deleted successfully."
        });
    } catch (error) {
        res.status(500).json({ message: "Deletion failed: " + error.message });
    }
};