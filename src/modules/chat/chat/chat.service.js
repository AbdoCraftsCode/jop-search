import { ChatModel } from "../../../DB/models/chaatmodel.js";
import { asyncHandelr } from "../../../utlis/response/error.response.js";
import { successresponse } from "../../../utlis/response/success.response.js";
import * as dbservice from "../../../DB/dbservice.js"


export const findHRChat = asyncHandelr(async (req, res, next) => {

        const { userId } = req.params; 
        const hrId = req.user._id; 

 
        const chat = await dbservice.findOneAndUpdate({
            model: ChatModel,
            filter: {
                $or: [
                    { senderId: hrId, receiverId: userId, isStartedByHR: true },
                    { senderId: userId, receiverId: hrId, isStartedByHR: true }
                ]
            },
            populate: [
                { path: "senderId", select: "name email" },
                { path: "receiverId", select: "name email" },
                { path: "messages.senderId", select: "name email" }
            ]
        });

        if (!chat) {
            return res.status(404).json({ message: "No chat found between HR and user" });
        }

        successresponse(res, { chat });
    
});
