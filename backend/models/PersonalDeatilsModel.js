import mongoose from 'mongoose';

const personalDetailsSchema = new mongoose.Schema({
  // Linking this details record to a specific Visa Request
  visa_request_id: {
    type: String,
    required: true,
    unique: true
  },
  personal_information: {
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    birth_name: { type: String, default: "" },
    present_nationality: { type: String, default: "" },
    nationality_at_birth: { type: String, default: "" },
    gender: { type: String, default: "" },
    place_of_birth: { type: String, default: "" },
    country_of_birth: { type: String, default: "" },
    date_of_birth: { type: String, default: "" },
    marital_status: { type: String, default: "" },
    travel_document_type: { type: String, default: "" },
    travel_document_number: { type: String, default: "" },
    issued_by_country: { type: String, default: "" },
    issued_by_authority: { type: String, default: "" },
    
    family_data: {
      spouse_first_name: { type: String, default: "" },
      spouse_last_name: { type: String, default: "" },
      spouse_birth_name: { type: String, default: "" },
      spouse_nationality: { type: String, default: "" },
      spouse_place_of_birth: { type: String, default: "" },
      spouse_country_of_birth: { type: String, default: "" },
      child_first_name: { type: String, default: "" },
      child_last_name: { type: String, default: "" },
      child_birth_name: { type: String, default: "" },
      child_date_of_birth: { type: String, default: "" },
      child_place_of_birth: { type: String, default: "" }
    },
    
    employment_information: {
      current_occupation: { type: String, default: "" },
      employer_name: { type: String, default: "" },
      employer_address: { type: String, default: "" },
      employer_phone: { type: String, default: "" }
    }
  }
}
, { timestamps: true });

const PersonalDetailsModel = mongoose.model('PersonalDetailsModel', personalDetailsSchema);
export default PersonalDetailsModel;