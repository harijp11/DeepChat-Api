import { Types } from "mongoose"

export interface IMessage {
  chatId: Types.ObjectId
  senderId: Types.ObjectId
  receiverId: Types.ObjectId
  text?: string                      // optional if media
  mediaUrl?: string                  // image/video/file message
  mediaType?: "image" | "video" | "file" | null
  replyTo?: Types.ObjectId | null    // reply reference
  reactions?: {
    emoji: string
    userId: Types.ObjectId
  }[]
  readBy: Types.ObjectId[]           // multiple readers (future group support)
  deliveredAt?: Date
  system?: boolean                   // system message flag
  createdAt?: Date
  updatedAt?: Date
}
