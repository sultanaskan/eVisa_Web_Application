import mongoose from 'mongoose';

const visaInformationSchema = new mongoose.Schema({
  // Linking this to the main Visa Request
  visa_request_id: {
    type: String,
    required: true,
    unique: true
  },
  visa_information: {
    about_visa: {
      diplomatic_consular_post: { type: String, default: "" },
      visa_type: { type: String, default: "Type D" },
      travel_purpose: { type: String, default: "" },
      number_of_days_stay: { type: String, default: "" },
      currently_studying: { type: String, default: "" },
      state_scholarship_approval: { type: String, default: "" },
      date_of_entry: { type: String, default: "" },
      date_of_departure: { type: String, default: "" },
      means_of_staying: { type: String, default: "" },
      means_of_transport: { type: String, default: "" }
    },
    previous_stay: {
      previously_stayed_in_rs: { type: String, default: "" },
      municipality: { type: String, default: "" },
      settlement: { type: String, default: "" },
      address: { type: String, default: "" },
      stay_period_until: { type: String, default: "" },
      basis_for_stay: { type: String, default: "" }
    },
    intended_residence: {
      host_name: { type: String, default: "" },
      street: { type: String, default: "" },
      house_number: { type: String, default: "" },
      municipality: { type: String, default: "" }
    }
  }
}, { timestamps: true });

export default mongoose.model('VisaInformationModel', visaInformationSchema);
