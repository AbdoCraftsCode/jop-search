import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    message: { type: String, required: true },  
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    createdAt: { type: Date, default: Date.now }
});

const ChatSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    messages: [MessageSchema] 
}, { timestamps: true });

export const ChatModel = mongoose.model("Chat", ChatSchema);
