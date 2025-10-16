import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map