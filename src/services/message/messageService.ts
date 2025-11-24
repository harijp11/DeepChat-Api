import { inject, injectable } from "tsyringe"
import { IMessageService } from "../../interfaces/services/IMessageService"
import { IMessageRepository } from "../../interfaces/repositories/IMessage"
import { IChatRepository } from "../../interfaces/repositories/IChatRepository"
import { IMessage } from "../../interfaces/models/IMessage"
import { Types } from "mongoose"

@injectable()
export class MessageService implements IMessageService {
  constructor(
    @inject("IMessageRepository")
    private messageRepo: IMessageRepository,

    @inject("IChatRepository")
    private chatRepo: IChatRepository
  ) {}

  async sendMessage(senderId: string, receiverId: string, text: string): Promise<IMessage> {
    let chat = await this.chatRepo.findChatByParticipants(senderId, receiverId)

    if (!chat) {
      chat = await this.chatRepo.createChat([
        new Types.ObjectId(senderId),
        new Types.ObjectId(receiverId)
      ])
    }

    const message = await this.messageRepo.createMessage({
      senderId,
      receiverId,
      message: text,
      chatId: chat._id
    })

    await this.chatRepo.updateLastMessage(chat._id.toString(), message._id.toString())

    return message
  }

  async getMessages(chatId: string): Promise<IMessage[]> {
    return this.messageRepo.getMessages(chatId)
  }
}
