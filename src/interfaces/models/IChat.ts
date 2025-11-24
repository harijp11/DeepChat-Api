import { Types } from "mongoose"

export interface IChat {
  participants: Types.ObjectId[]
  lastMessage?: Types.ObjectId
  pinnedMessage?: Types.ObjectId | null
  unreadCount?: {
    userId: Types.ObjectId
    count: number
  }[]
  type?: "private" | "group"
  archivedBy?: Types.ObjectId[]
  blockedBy?: Types.ObjectId[]
  createdAt?: Date
  updatedAt?: Date
}
