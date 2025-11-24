
import { Server, Socket } from "socket.io"
import chatService from "../services/chat.service"

export default function chatSocketHandler(socket: Socket, io: Server) {
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId)
  })

  socket.on("sendMessage", async ({ roomId, senderId, receiverId, message }) => {
    const saved = await chatService.saveMessage(senderId, receiverId, message)
    io.to(roomId).emit("receiveMessage", saved)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
}
