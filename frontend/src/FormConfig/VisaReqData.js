export const VisaReqData = {
  uid: "",
  request_number: "",
  status: "",
  visa_type: "",
  visa_no: "",

  travel_purpose: {
    category: "",
    specific_purpose: ""
  },

  personal_data: {
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    place_of_birth: "",
    country_of_birth: "",
    citizenship_at_birth: "",
    current_citizenship: "",
    foreign_registration_no: ""
  },

  travel_doc: {
    type: "",
    number: "",
    issuing_country: "",
    date_of_issue: "",
    valid_until: ""
  },

  visa_info: {
    intended_date_of_entry: "",
    intended_duration_of_stay: "",
    previous_visas_issued: [],
    fingerprints_collected: ""
  },

  attachments: [
    {
      file_name: "",
      file_type: "",
      file_url: "",
      ocr_verified: ""
    }
  ],

  fee: {
    amount: "",
    currency: "",
    payment_status: "",
    transaction_reference: ""
  }
};