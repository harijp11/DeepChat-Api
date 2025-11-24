import type { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  bio:string
  password: string;
  profileImage:string
  createdAt: Date;
  updatedAt: Date;
}