import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // Assuming you have the user ID in req.user
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
};

export const getMessages = async (req,res) => {
    try {
        const {userId: usertoChat} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({$or: [
            {senderId: myId, receiverId: usertoChat},
            {senderId: usertoChat, receiverId: myId}
        ]}).sort({createdAt: 1});

        return res.status(200).json(messages);

    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const sendMessage = async (req,res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const cloudResponse = await cloudinary.uploader.upload(image);
            imageUrl = cloudResponse.secure_url;
        };

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        // adding socke.io logic
        const recieverSocketId = getRecieverSocketId(receiverId);
        if(recieverSocketId){
           io.to(recieverSocketId).emit("newMessage", newMessage);
        };

        return res.status(200).json(newMessage);

    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}