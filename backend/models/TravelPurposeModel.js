import mongoose from 'mongoose';

const travelPurposeSchema = new mongoose.Schema({
  visa_request_id: {type: String},
  category: { type: String, required: true },
  specific_purpose: { type: String,required: true}
}, { timestamps: true });

// CHANGE THIS FROM module.exports = ...
export default mongoose.model('TravelPurposeModel', travelPurposeSchema);