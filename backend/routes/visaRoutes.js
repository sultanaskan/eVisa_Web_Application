import express from 'express';
import { findVisaList, findOneRequest, RequestVisa, updateVisaRequest } from '../controllers/VisaController.js';

const visaRoutes = express.Router();


visaRoutes.post('/visa_request', RequestVisa);
visaRoutes.put('/update_request/:id', updateVisaRequest);
visaRoutes.get('/find_all_request', findVisaList);
visaRoutes.get('/find_one_request/:id', findOneRequest);
 

export default visaRoutes;