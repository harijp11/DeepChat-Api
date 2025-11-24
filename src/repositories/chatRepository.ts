import { IChat } from "../interfaces/models/IChat"
import { ChatModel } from "../models/chatSchema"
import { IChatRepository } from "../interfaces/repositories/IChatRepository"
import { Types } from "mongoose"
import { injectable } from "tsyringe"

@injectable()
export class ChatRepository implements IChatRepository {
    constructor(){}
  async findChatByParticipants(userA: string, userB: string): Promise<IChat | null> {
    return ChatModel.findOne({
      participants: { $all: [userA, userB] }
    })
  }

  async createChat(participants: Types.ObjectId[]): Promise<IChat> {
    return ChatModel.create({ participants })
  }

  async updateLastMessage(chatId: string, messageId: string): Promise<void> {
    await ChatModel.findByIdAndUpdate(chatId, { lastMessage: messageId })
  }

  async getUserChats(userId: string): Promise<IChat[]> {
    return ChatModel.find({ participants: { $in: [userId] } })
      .populate("participants", "name profileImage")
      .populate("lastMessage")
      .sort({ updatedAt: -1 })
  }
}


