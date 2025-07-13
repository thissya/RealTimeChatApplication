
import cloudinary from '../lib/cloudinary.js';
import Message from '../models/message.model.js';
import User from '../models/user.model.js';

export const getUsersForSidebar = async(req,res)=>{
    try {
        const loggedInUser = req.user._id;
        console.log(loggedInUser);
        const filteredUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password");
        return res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUsers for Sidebar Controller : ",error.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatWith} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
          $or:[
            {senderId:myId,receiverId:userToChatWith},
            {senderId:userToChatWith,receiverId:myId}
          ]  
        });

        return res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller : ",error.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const sendMessages = async(req,res)=>{
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        });

        await newMessage.save();

        return res.status(200).json(newMessage);

    } catch (error) {
        
        console.log("Error in sendMessage Controller : ",error.message);
        return res.status(500).json({message:"Internal Server Error"});

    }
}