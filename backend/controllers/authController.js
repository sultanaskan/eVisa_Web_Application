import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const generateToken = (id) => {
    return (jwt.sign({ id}), process.env.JWT_SECRET, {expiresIn: '2d'});
};


export const registerUser = async (req, res) => {
    const { fname,lname,dType, passCountry, dNumber, dEDate, email, password } = req.body;
    
    const userExists = await User.findOne({ email});
    if(userExists) return res.status(400).json({ message: "User alreayd existes"});

    const user = await User.create({fname,lname, dType, passCountry, dNumber, dEDate, email, password});

    res.json(
        {
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
        
    
    
};



export const loginUser = async (req, res) => {
    console.log("LOGIN ATEMPT")
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
};


    
