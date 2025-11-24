import { Schema, model } from "mongoose"
import { IChat } from "../interfaces/models/IChat"

const ChatSchema = new Schema<IChat>(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: true }
    ],

    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    pinnedMessage: { type: Schema.Types.ObjectId, ref: "Message", default: null },

    unreadCount: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        count: { type: Number, default: 0 }
      }
    ],

    type: { type: String, enum: ["private", "group"], default: "private" },

    archivedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    blockedBy: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
)

export const ChatModel = model<IChat>("Chat", ChatSchema)
