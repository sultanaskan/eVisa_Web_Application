
import { visaDataDestructuror } from "../functions.js";
import VisaRequest from "../models/VisaRequest.js";
import mongoose from "mongoose";


export const RequestVisa = async (req, res) => {
    const visaData = visaDataDestructuror(req);  
    console.log(visaData);
    //Request a new visa
    const VisaReq = await VisaRequest.create(visaData);

    res.send("DOne");


    
}

export const UpdateVisa = async(req, res) => {
  console.log("Visa UPdate controller runing");
}

export const FindAllVisa = async(req, res) => {
  console.log(" All visa founded");
}

export const findOneVisa = async(req, res) => {
  console.log(" One visa founded");
}