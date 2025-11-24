import { Schema, model } from "mongoose"
import { IMessage } from "../interfaces/models/IMessage"

const MessageSchema = new Schema<IMessage>(
  {
    chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    text: { type: String },
    mediaUrl: { type: String, default: null },
    mediaType: { type: String, enum: ["image", "video", "file", null], default: null },

    replyTo: { type: Schema.Types.ObjectId, ref: "Message", default: null },

    reactions: [
      {
        emoji: { type: String },
        userId: { type: Schema.Types.ObjectId, ref: "User" }
      }
    ],

    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    deliveredAt: { type: Date, default: null },

    system: { type: Boolean, default: false }
  },
  { timestamps: true }
)

export const MessageModel = model<IMessage>("Message", MessageSchema)
 