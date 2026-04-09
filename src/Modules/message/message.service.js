import messageModel from "../../DB/Models/message/message.model.js";
import * as dbService from "../../DB/database.repository.js";
import {
  badRequest,
  conflict,
  notFound,
} from "../../Utils/response/error.response.js";
import successResponse from "../../Utils/response/success.response.js";
import User from "../../DB/Models/User/user.model.js";

export const sendMessage = async (req, res, next) => {
  const { content } = req.body;
  const { receiverId } = req.params;
  const user = await dbService.findOne({
    model: User,
    filter: { _id: receiverId },
  });
  if (!user) {
    throw notFound({ message: "User not found" });
  }
  const message = await dbService.create({
    model: messageModel,
    data: [
      {
        content,
        receiver: user._id,
      },
    ],
  });

  return successResponse({
    res,
    message: "Message sent successfully",
    data: message,
    statusCode: 201,
  });
};
export const getMessages = async (req, res, next) => {
  const messages = await dbService.find({
    model: messageModel,
    filter: { receiver: req.user._id },
  });
  return successResponse({
    res,
    message: "Messages fetched successfully",
    data: messages,
    statusCode: 200,
  });
};
