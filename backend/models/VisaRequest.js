import mongoose from 'mongoose';

const visaRequestSchema = new mongoose.Schema({
  uid: { type: String, required: true }, // user_8823asdf4af2
  request_number: { type: String, required: true, unique: true }, // REQ-202a6-00421
  status: { type: String, default: 'Draft' },
  visa_type: { type: String, required: true },
  visa_no: { type: String, default: null },
  visa_request_id:{type:String}
  // Add other sections here as you build them (e.g., personal_info)
}, { timestamps: true });

export default mongoose.model('VisaRequest', visaRequestSchema);