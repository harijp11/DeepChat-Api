import mongoose, { model, Schema } from "mongoose";
import type { IRefreshToken } from "../interfaces/models/IRefreshToken";

const refreshTokenSchema = new Schema<IRefreshToken>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export const RefreshTokenModel = model<IRefreshToken>("RefreshToken", refreshTokenSchema);