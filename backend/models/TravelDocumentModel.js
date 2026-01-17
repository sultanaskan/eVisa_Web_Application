import mongoose from 'mongoose';

const travelDocumentSchema = new mongoose.Schema({
  // Link to the specific Visa Request
  visa_request_id: {
    type: String, // Or mongoose.Schema.Types.ObjectId if using references
    required: true,
    unique: true
  },
  travel_document_info: {
    type_of_travel_document: { type: String, default: "" },
    travel_document_number: { type: String, default: "" },
    country_of_issue: { type: String, default: "" },
    place_of_issue: { type: String, default: "" },
    date_of_issue: { type: String, default: "" },
    valid_until: { type: String, default: "" },
    resides_in_other_country: { type: String, default: "" }
  }
}, { timestamps: true });

const TravelDocumentModel = mongoose.model('TravelDocument', travelDocumentSchema);
export default TravelDocumentModel;