import express from 'express';
import { FindAllVisa, findOneVisa, RequestVisa, UpdateVisa } from '../controllers/VisaController.js';

const visaRoutes = express.Router();


visaRoutes.post('/visa_request', RequestVisa);
visaRoutes.patch('/update', UpdateVisa);
visaRoutes.get('/find_all', FindAllVisa);
visaRoutes.get('/findOne/_id', findOneVisa);

export default visaRoutes;