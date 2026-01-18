import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const generateToken = (id) => {
    return jwt.sign({ id}, process.env.JWT_SECRET, {expiresIn: '2d'});
};


export const registerUser = async (req, res) => {
    try {
        const { fname, lname, dType, passCountry, dNumber, dEDate, email, password } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ fname, lname, dType, passCountry, dNumber, dEDate, email, password });
        const t =generateToken(user._id);
        console.log(`TOKEN: ${t}`);
        res.json({
            success:true,
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            dType: user.dType,
            passCountry: user.passCountry,
            dNumber: user.dNumber,
            email: user.email,
            isAdmin: user.isAdmin,
            token: t,
        });
    } catch (error) {
        console.error("Register Error:", error); // This prints the REAL error in your terminal
        res.status(500).json({ message: error.message });
    }
};



export const loginUser = async (req, res) => {
    console.log("LOGIN ATEMPT")

    try{
        const { email, password } = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({ message: "Invalid email or passworde"});
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ message: "Invalid email or password"});
    
    const token = jwt.sign(
        {_id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    );

    res.json(
        {
            success:true,
            token: token,
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            dType: user.dType,
            passCountry: user.passCountry,
            dNumber: user.dNumber,
            email: user.email,
            isAdmin:user.isAdmin,
        }
    )
    }catch(error){
        return res.status(500).json({message: `Server error: ${error}`});
    }
    
};



export const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        if(users){
            res.status(200).json(users);
        }else{
            res.status(400).json({message:"Bad request! "})
        }
    }catch(error){
        res.status(500).json({message:"somthing wrong on server."}, error)
    }
}
    
