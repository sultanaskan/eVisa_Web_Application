import mongoose from 'mongoose';


// Add this to your existing VisaInformationModel or similar
const documentMetadataSchema = {
  url: String,
  name: String,
  size: Number,
  uploadedAt: { type: Date, default: Date.now }
};

// In your main schema definition:
const VisaInformationSchema = new mongoose.Schema({
  visa_request_id: { type: String, required: true, unique: true },
  // ... other fields
  documents: {
    photography: documentMetadataSchema,
    scanned_travel_document: documentMetadataSchema,
    invitation_letter: documentMetadataSchema,
    ministry_accreditation: documentMetadataSchema,
    additional_document_1: documentMetadataSchema,
    additional_document_2: documentMetadataSchema,
    additional_document_3: documentMetadataSchema,
    additional_document_4: documentMetadataSchema,
    additional_document_5: documentMetadataSchema,
  }
}, { timestamps: true });

const DocumentsModel = mongoose.model('Documents', VisaInformationSchema);
export default DocumentsModel;