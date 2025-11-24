import { Model } from "mongoose";
import type { IUser } from "../interfaces/models/IUser";
import { UserModel } from "../models/UserSchema";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { injectable } from "tsyringe";


@injectable()
export class UserRepository implements IUserRepository {
  constructor() {} 

  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async findById(_id:string){
    return UserModel.findById(_id)
  }

  async findByIdAndUpdate(_id: string,user:IUser): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(
      _id,
      user
    )
  }

  async findByIdAndUpdatePassword(_id: string, password: string): Promise<IUser | void | null> {
    return UserModel.findByIdAndUpdate(_id,{$set:{password:password}},{new:true})
  }

  async findByPhone(phone: string) {
    return UserModel.findOne({ phone });
  }

  async create(user: Partial<IUser>) {
    const doc = new UserModel(user);
    return doc.save();
  }
}
