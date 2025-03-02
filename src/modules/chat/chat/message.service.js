import { ChatModel } from "../../../DB/models/chaatmodel.js";
import { scketConnections } from "../../../DB/models/User.model.js";
import { authenticationSocket } from "../../../middlewere/auth.socket.middlewere.js";
import * as dbservice from "../../../DB/dbservice.js"






export const sendMessage = (socket) => {
    return socket.on("sendMessage", async (messageData) => {
        try {
       
            const { data } = await authenticationSocket({ socket });

            if (!data.valid) {
                return socket.emit("socketErrorResponse", data);
            }

            const userId = data.user._id.toString();
            const { destId, message } = messageData;

            let chat = await dbservice.findOneAndUpdate({
                model: ChatModel,
                filter: {
                    $or: [
                        { senderId: userId, receiverId: destId, isStartedByHR: true },
                        { senderId: destId, receiverId: userId, isStartedByHR: true }
                    ]
                },
                data: {
                    $push: {
                        messages: {
                            message,
                            senderId: userId
                        }
                    }
                }
            });

            if (!chat) {
                return socket.emit("socketErrorResponse", { message: "Only HR can start a conversation" });
            }

            socket.emit("successMessage", { message });
            if (scketConnections.has(destId)) {
                socket.to(scketConnections.get(destId)).emit("receiveMessage", { message });
            }

            return "done";
        } catch (error) {
            console.error("Socket sendMessage error:", error);
            socket.emit("socketErrorResponse", { message: "An error occurred while sending the message" });
        }
    });
};
