import { IChat } from "../models/IChat"

export interface IChatService {
  getOrCreateChat(userA: string, userB: string): Promise<IChat>
  getUserChats(userId: string): Promise<IChat[]>
}
