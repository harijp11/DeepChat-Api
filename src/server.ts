import express from "express"
import cors from "cors"
import "reflect-metadata"
import chatRoutes from "./api/Chatroutes"
import authRoutes from "./api/authRoutes"
import userRoutes from "./api/userRoutes"
import { connectDB } from "./config/db"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import dotenv from "dotenv"
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware"
import http from "http"
import { Server } from "socket.io"
import chatSocketHandler from "./sockets/chat.socket"  

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

connectDB()

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
)

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

app.use("/api/chat", chatRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

app.use(notFoundMiddleware)

// Create HTTP server for socket.io
const server = http.createServer(app)

// Attach socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }
})

// Socket logic
io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id)
  chatSocketHandler(socket, io)
})

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
