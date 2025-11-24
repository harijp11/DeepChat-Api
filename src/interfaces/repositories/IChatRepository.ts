import { IChat } from "../models/IChat"
import { Types } from "mongoose"

export interface IChatRepository {
  findChatByParticipants(userA: string, userB: string): Promise<IChat | null>
  createChat(participants: Types.ObjectId[]): Promise<IChat>
  updateLastMessage(chatId: string, messageId: string): Promise<void>
  getUserChats(userId: string): Promise<IChat[]>
}
