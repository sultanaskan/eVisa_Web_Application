export function visaDataDestructuror(req) {
  const {
    uid = '',
    request_number = '',
    status = 'Draft',
    visa_type = '',
    visa_no = '',
    travel_purpose: { category = '', specific_purpose = '' } = {},
    personal_data: {
      first_name = '',
      last_name = '',
      gender = '',
      date_of_birth = new Date("2026-05-20"),
      place_of_birth = '',
      country_of_birth = '',
      citizenship_at_birth = '',
      current_citizenship = '',
      foreign_registration_no = ''
    } = {},
    travel_doc: {
      type = '',
      number = '',
      issuing_country = '',
      date_of_issue = new Date("2026-05-20"),
      valid_until = new Date("2026-05-20"),
    } = {},
    visa_info: {
      intended_date_of_entry = new Date("2026-05-20"),
      intended_duration_of_stay = 0,
      previous_visas_issued = [{}],
      fingerprints_collected = false
    } = {},
    attachments = [], 
    fee: {
      amount = 0,
      currency = '',
      payment_status = '',
      transaction_reference = ''
    } = {}
  } = req.body;

  // Assigning the variables into the object
  const visaReqObject = {
    uid,
    request_number,
    status,
    visa_type,
    visa_no,
    travel_purpose: { category, specific_purpose },
    personal_data: {
      first_name,
      last_name,
      gender,
      date_of_birth,
      place_of_birth,
      country_of_birth,
      citizenship_at_birth,
      current_citizenship,
      foreign_registration_no
    },
    travel_doc: { type, number, issuing_country, date_of_issue, valid_until },
    visa_info: {
      intended_date_of_entry,
      intended_duration_of_stay,
      previous_visas_issued,
      fingerprints_collected
    },
    attachments,
    fee: { amount, currency, payment_status, transaction_reference }
  };

  return visaReqObject;
};