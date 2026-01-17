
import VisaRequest from "../models/VisaRequest.js";
import mongoose from "mongoose";


export const RequestVisa = async (req, res) => {
  try {
    const ui = req.params.uid;
    const { uid, request_number, status, visa_type, visa_no, visa_request_id } = req.body; 
    // 1. You must pass ONE object { } inside the create method
    // 2. You MUST use 'await' because database operations are asynchronous
    const visaR = await VisaRequest.create({
      uid,
      request_number,
      status,
      visa_type,
      visa_no,
      visa_request_id:"true",
    });

    // Send back the created document
    res.status(200).json(visaR);
    } catch (error) {
    // This will now catch validation errors or duplicate request_number errors
    res.status(400).json({ message: error.message });
  }
};


export const UpdateVisaRequest = async (req, res) => {
  try {
    const { uid, request_number, status, visa_type, visa_no , visa_request_id } = req.body;
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Request ID is required" });
    }
    const VR = await VisaRequest.findOneAndUpdate(
      { _id: id }, 
      { uid, request_number, status, visa_type, visa_no , visa_request_id },
      { new: true, runValidators: true }
    );
    if (!VR) {
      return res.status(404).json({ message: "Visa request not found" });
    }
    // 4. Send the response back
    res.status(200).json({
      message: "Update successful",
      data: VR
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




export const FindVisaList = async(req, res) => {
  try{
    const uid = req.params.uid;
    const visaRequestList = await VisaRequest.find({uid});
    if(visaRequestList){
      res.status(200).json({visaRequestList})
    }else{
      res.status(404).json({message: "No Visa rquest found"})
    }
    
  }catch(error){
    res.status(400).json({message: `Bad Request: ${error}`})
  }
}


export const FindOneVisaRequest = async (req, res) => {
  try {
    const { id } = req.params; // Cleaner destructurin

    if (!id) {
      return res.status(400).json({ message: "Please attach Visa request id" });
    }
    const visaRequest = await VisaRequest.findById(id);

    if (!visaRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    return res.status(200).json(visaRequest);
  } catch (error) {
    // Check if the error is due to a malformed MongoDB ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    return res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};


export const DeleteAllVisaRequest = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const result = await VisaRequest.deleteMany({ uid: uid });
    // 2. Check if anything was actually deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No visa requests found for this user." });
    }
    // 3. Logic check: If you delete all, the list will be empty []. 
    // Usually, you return a success message or the empty array.
    res.status(200).json({
      message: `Successfully deleted ${result.deletedCount} requests.`,
      updatedList: [] 
    });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};




export const DeleteOneVisaRequest = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    // 1. Delete and capture the deleted document to get its 'uid'
    const deletedDoc = await VisaRequest.findByIdAndDelete(id);
    if (!deletedDoc) {
      return res.status(404).json({ message: "Visa request not found" });
    }
    // 2. Fetch the updated list for the owner of the deleted request
    const updatedList = await VisaRequest.find({ uid: deletedDoc.uid });
    // 3. Return the fresh list
    return res.status(200).json(updatedList);
  } catch (error) {
    // Handle invalid MongoDB ID strings
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: `Internal Server error: ${error.message}` });
  }
};