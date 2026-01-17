import DocumentsModel from '../models/DocumentsModel.js';

export const UpsertDocumentsController = async (req, res) => {
     try {
    console.log("Upload controller reached");
    const { vrid } = req.params; // The ID from the URL
    const files = req.files;     // Injected by Multer


    if (!vrid) return res.status(400).json({ message: "Visa Request ID is required." });
    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    const updateData = {};
    const responseLinks = {};

    // Process each file uploaded
    Object.keys(files).forEach((field) => {
      const file = files[field][0];
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/visa-documents/${file.filename}`;

      // Update the specific document field in MongoDB
      updateData[`documents.${field}`] = {
        url: fileUrl,
        name: file.filename, // This will be "visa-doc-..."
        size: file.size
      };

      // Store link for the frontend response
      responseLinks[field] = fileUrl;
    });

    const updatedDoc = await DocumentsModel.findOneAndUpdate(
      { visa_request_id: vrid },
      { $set: updateData },
      { new: true, upsert: true }
    );

    // Matches your frontend: response.data.links
    return res.status(200).json({
      message: "Documents uploaded and saved successfully.",
      links: responseLinks,
      updatedDoc
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};


export const GetDocumentsController = async (req, res) => {
    try {
        const { vrid } = req.params;

        const docsData = await DocumentsModel.findOne({ visa_request_id: vrid });
        console.log("docData: ", docsData);

        if (!docsData) {
            return res.status(200).json({ 
                message: "No documents found for this request.",
                data: null 
            });
        }

        return res.status(200).json(docsData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching documents: " + error.message });
    }
};




export const DeleteDocumentsController = async (req, res) => {
    try {
        const { vrid } = req.params;

        const deletedDoc = await DocumentsModel.findOneAndDelete({ visa_request_id: vrid });

        if (!deletedDoc) {
            return res.status(404).json({ message: "Documents record not found." });
        }

        return res.status(200).json({
            success: true,
            message: "Document references deleted successfully."
        });
    } catch (error) {
        res.status(500).json({ message: "Deletion failed: " + error.message });
    }
};