import { IMessage } from "../interfaces/models/IMessage";
import { MessageModel } from "../models/MessageSchema";
import { IMessageRepository } from "../interfaces/repositories/IMessage";
import { injectable } from "tsyringe";

@injectable()
export class MessageRepository implements IMessageRepository {
  constructor() {}
  async createMessage(data: Partial<IMessage>): Promise<IMessage> {
    return MessageModel.create(data);
  }

  async getMessages(chatId: string): Promise<IMessage[]> {
    return MessageModel.find({ chatId })
      .sort({ createdAt: 1 })
      .populate("senderId", "name profileImage")
      .populate("receiverId", "name profileImage");
  }
}


