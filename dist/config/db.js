import mongoose from "mongoose";
export const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/deepChat";
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connected successfully");
    }
    catch (err) {
        console.error("❌ MongoDB connection error:", err);
        throw err;
    }
};
//# sourceMappingURL=db.js.map