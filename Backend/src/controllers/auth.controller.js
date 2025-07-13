import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req,res)=>{
    console.log(req.body);
    const {fullName,email,password}= req.body;
    try{
        if(!fullName || !email || !password){
            res.status(400).json({message:"All fields are required"});
        }
        if(password.length<6){
            res.status(400).json({message:"Password must be atleast 6 characters"});
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User Already Exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);    

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        });

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            console.log("User Added");
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                ProfilePic:newUser.profilePic,

            });

        }else{
            return res.status(400).json({message:"Invalid User Data"});
        }


    }catch(error){
        console.log("Error in the Auth Controller ");
        res.status(500).json({message:"Internal Server Error "+error.message});
    }

}

export const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"Invalid Credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.  password);
        
        if(!isPasswordCorrect){
            res.status(400).json({message:"Password is Incorrect"});
        }

        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic: user.profilePic,
        });

    }catch(error){
        console.log("Error in Login Controller ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out Successfully"});
    }catch(error){
        console.log("Error in Logout controller ",error.message);
        res.status(500).json({message:"Internal Server Error "});
    }
}

export const updateProfile = async (req,res)=>{
    try {
        
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updateUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});
        
        return res.status(200).json(updateUser);

    } catch (error) {
        console.log("Error in Update Profile controller : ",error.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const checkAuth = async(req,res)=>{
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth Controller : ",error.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
}