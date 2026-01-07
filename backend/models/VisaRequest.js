import mongoose from 'mongoose';

const VisaRequestSchema = new mongoose.Schema({
  // --- Metadata & Identification ---
  uid: { type: String, required: true, unique: true },
  request_number: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    enum: ['Draft', 'Pending', 'Approved', 'Rejected'], 
    default: 'Draft' 
  },
  visa_type: { type: String, required: true }, // e.g., "Type D"
  visa_no: { type: String }, // Assigned after approval

  // --- Step 1: Travel Purpose ---
  travel_purpose: {
    category: { type: String, required: true }, // e.g., "Employment"
    specific_purpose: { type: String, required: true } // e.g., "Accredited foreign journalist"
  },

  // --- Step 2: Personal Data ---
  personal_data: {
    first_name: { type: String, required: true }, // Use English alphabet
    last_name: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'] },
    date_of_birth: { type: Date, required: true },
    place_of_birth: { type: String },
    country_of_birth: { type: String },
    citizenship_at_birth: { type: String },
    current_citizenship: { type: String },
    foreign_registration_no: { type: String } // "Do you have a Foreigner's Registration Number?"
  },

  // --- Step 3: Travel Documents ---
  travel_doc: {
    type: { type: String, required: true }, // Passport, etc.
    number: { type: String, required: true },
    issuing_country: { type: String, required: true },
    date_of_issue: { type: Date },
    valid_until: { type: Date, required: true }
  },

  // --- Step 4: Visa Information ---
  visa_info: {
    intended_date_of_entry: { type: Date },
    intended_duration_of_stay: { type: Number }, // Days
    previous_visas_issued: [{ type: String }],
    fingerprints_collected: { type: Boolean, default: false }
  },

  // --- Step 5: Add Documents (Attachments) ---
  attachments: [{
    file_name: { type: String },
    file_type: { type: String }, // .png, .jpeg, .jpg
    file_url: { type: String },
    ocr_verified: { type: Boolean, default: false } // Based on machine-read consent
  }],

  // --- Step 6: Fees ---
  fee: {
    amount: { type: Number },
    currency: { type: String, default: 'EUR' },
    payment_status: { type: String, enum: ['Unpaid', 'Paid'], default: 'Unpaid' },
    transaction_reference: { type: String }
  }

}, { timestamps: true });

export default mongoose.model('VisaRequest', VisaRequestSchema);