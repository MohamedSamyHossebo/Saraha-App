import Joi from "joi";
import { generalFields } from "../../Middlewares/validation.middleware.js";

export const sendMessageSchema = {
  body: Joi.object({
    content: Joi.string().min(10).max(1000).required().messages({
      "any.required": "Content is required",
      "string.empty": "Content is required",
      "string.min": "Content must be at least 10 characters long",
      "string.max": "Content must be at most 1000 characters long",
    }),
  }),
  params: Joi.object({
    receiverId: generalFields.id.required().messages({
      "any.required": "Receiver ID is required",
      "string.empty": "Receiver ID is required",
      "string.pattern.base": "Invalid receiver ID",
    }),
  }),
  query: Joi.object({}),
};
