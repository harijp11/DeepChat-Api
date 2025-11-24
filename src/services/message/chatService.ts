import { inject, injectable } from "tsyringe"
import { IChatService } from "../../interfaces/services/IChatService"
import { IChatRepository } from "../../interfaces/repositories/IChatRepository"
import { IChat } from "../../interfaces/models/IChat"
import { Types } from "mongoose"

@injectable()
export class ChatService implements IChatService {
  constructor(
    @inject("IChatRepository")
    private chatRepo: IChatRepository
  ) {}

  async getOrCreateChat(userA: string, userB: string): Promise<IChat> {
    let chat = await this.chatRepo.findChatByParticipants(userA, userB)

    if (!chat) {
      chat = await this.chatRepo.createChat([
        new Types.ObjectId(userA),
        new Types.ObjectId(userB)
      ])
    }

    return chat
  }

  async getUserChats(userId: string): Promise<IChat[]> {
    return this.chatRepo.getUserChats(userId)
  }
}
