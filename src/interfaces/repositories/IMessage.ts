import { IMessage } from "../models/IMessage"

export interface IMessageRepository {
  createMessage(data: Partial<IMessage>): Promise<IMessage>
  getMessages(chatId: string): Promise<IMessage[]>
}
