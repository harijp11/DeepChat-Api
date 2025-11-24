import mongoose, { model, Schema } from "mongoose";
import type { IUser } from "../interfaces/models/IUser";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    profileImage:{ type:String },
    bio:{ type:String }
  },
  { timestamps: true }
);
   
export const UserModel = model<IUser>("User", UserSchema);

