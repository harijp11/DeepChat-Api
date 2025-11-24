import { IMessage } from "../models/IMessage"

export interface IMessageService {
  sendMessage(senderId: string, receiverId: string, text: string): Promise<IMessage>
  getMessages(chatId: string): Promise<IMessage[]>
}
