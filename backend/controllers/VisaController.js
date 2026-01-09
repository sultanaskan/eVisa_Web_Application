
import { visaDataDestructuror } from "../functions.js";
import VisaRequest from "../models/VisaRequest.js";
import mongoose from "mongoose";


export const RequestVisa = async (req, res) => {
  try{
    const visaData = visaDataDestructuror(req);  
    console.log("Data:" + visaData);
    //Request a new visa
    const VisaReq = await VisaRequest.create(visaData);   
    if(!VisaReq){
      return res.status(400).json({message: "Visa request not found"});
      }
      else{
        return res.status(200).json({message: "Visa request Successfull"})
      } 
  }catch (error){
    res.status(400).json({message: error.message})
  }
}


export const updateVisaRequest = async(req, res) => {
  
  try{
    const updatedData = visaDataDestructuror(req);
    console.log(`Visa UPdate controller runing: ${updatedData.fname}`);
    const id = req.params.id;

  const updatedRequest = await VisaRequest.findByIdAndUpdate(
    id,
    updatedData,
    {new:true, runValidators: true}
  )

  if(!updatedRequest){
    return res.status(404).json({message: "Visa request not found"});
  }

  res.status(200).json(updatedRequest);
  }catch(error){
    res.status(400).json({message: error.message});
  }
};




export const findVisaList = async(req, res) => {
  console.log(" All visa founded");
  try{
    const visaRequestList = await VisaRequest.find(
      {},
       {uid:1, request_number:1, status: 1, visa_type:1, visa_no:1}
    );
    console.log(`Visa List: ${visaRequestList} `);
    res.status(200).json({visaRequestList})

  }catch(error){
    res.status(400).json({message: `Bad Request: ${error}`})
  }
}

export const findOneRequest = async(req, res) => {
  try{
    const id = req.params.id;
    const visaRequest = await VisaRequest.findById(id);
    if(!visaRequest){
      return res.status(404).json({messsage: `Request not found`});
    } return res.status(200).json({visaRequest});
  }catch(error){
      return res.status(400).json({message: `Bad Request ${error}`})
  }

}