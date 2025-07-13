import mongoose from 'mongoose';

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongo DB connected successfully");
    }catch(error){
        console.log("MongoDB Connection error",error);
    }
};