import express from 'express';
import { FindVisaList, FindOneVisaRequest, RequestVisa, UpdateVisaRequest,DeleteAllVisaRequest,DeleteOneVisaRequest } from '../controllers/VisaController.js';
import { TravelPurposeController,DeleteTravelPurposeController ,GetTravelPurposeController } from '../controllers/TravelPurposeController.js';
import {DeletePersonalDetailsController, GetPersonalDetailsController, PersonalDetailsController} from '../controllers/PersonalDetailsController.js'
import { DeleteTravelDocumentController, GetTravelDocumentController, UpsertTravelDocumentController } from '../controllers/TravelDocumentController.js';
import {DeleteVisaInfoController, GetVisaInfoController , UpsertVisaInfoController} from '../controllers/VisaInformationsController.js';
import {DeleteDocumentsController, UpsertDocumentsController, GetDocumentsController} from '../controllers/DocumentController.js'
import { upload } from '../middleware/uploadMiddleware.js';
const visaRoutes = express.Router();

//All operation on visa request resource
visaRoutes.post('/visa-request', RequestVisa);
visaRoutes.put('/visa-request/:id', UpdateVisaRequest);
visaRoutes.get('/visa-request/find-list/:uid', FindVisaList)
visaRoutes.get('/visa-request/find-one/:id', FindOneVisaRequest);
visaRoutes.delete('/visa-request/delete-one/:id', DeleteOneVisaRequest);
visaRoutes.delete('/visa-request/delete-all/:uid', DeleteAllVisaRequest);





//Travel PurposePuorpus Routs
visaRoutes.put('/visa-request/travel-purpose/:vrid', TravelPurposeController );
visaRoutes.get('/visa-request/travel-purpose/:vrid', GetTravelPurposeController );
visaRoutes.delete('/visa-request/travel-purpose/:vrid', DeleteTravelPurposeController );
//visaRoutes.get('/travel-purpose/:id', TravelPurposeController );



// Persona details
visaRoutes.put('/visa-request/personal-details/:vrid', PersonalDetailsController);
visaRoutes.get('/visa-request/personal-details/:vrid', GetPersonalDetailsController);
visaRoutes.delete('/visa-request/personal-details/:vrid', DeletePersonalDetailsController);



// Travel documnet routes details
visaRoutes.put('/visa-request/travel-documents/:vrid', UpsertTravelDocumentController);
visaRoutes.get('/visa-request/travel-documents/:vrid', GetTravelDocumentController);
visaRoutes.delete('/visa-request/travel-documents/:vrid', DeleteTravelDocumentController);




//visa information controller routs
visaRoutes.put('/visa-request/visa-informations/:vrid', UpsertVisaInfoController);
visaRoutes.get('/visa-request/visa-informations/:vrid', GetVisaInfoController);
visaRoutes.delete('/visa-request/visa-informations/:vrid', DeleteVisaInfoController);


// Define which fields Multer should listen for
const fileFields = [
  { name: 'photography', maxCount: 1 },
  { name: 'scanned_travel_document', maxCount: 1 },
  { name: 'invitation_letter', maxCount: 1 },
  { name: 'ministry_accreditation', maxCount: 1 },
  { name: 'additional_document_1', maxCount: 1 },
  { name: 'additional_document_2', maxCount: 1 },
  { name: 'additional_document_3', maxCount: 1 },
  { name: 'additional_document_4', maxCount: 1 },
  { name: 'additional_document_5', maxCount: 1 },
];


// --- Documents (Attachments) Routes ---
//visaRoutes.put('/visa-request/documents/:vrid', upload.fields(fileFields),  UploadVisaDocumentsController);
visaRoutes.put('/visa-request/documents/:vrid', upload.fields(fileFields),  UpsertDocumentsController);
visaRoutes.get('/visa-request/documents/:vrid', GetDocumentsController);
visaRoutes.delete('/visa-request/documents/:vrid', DeleteDocumentsController);


 

export default visaRoutes;