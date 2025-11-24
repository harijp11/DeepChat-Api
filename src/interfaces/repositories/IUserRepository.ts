import type {IUser}  from "../models/IUser";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  findById(_id:string):Promise<IUser | null>;
  findByIdAndUpdate(_id:string,user:IUser):Promise<IUser | null>;
  findByPhone(phone: string): Promise<IUser | null>;
  create(user: Partial<IUser>): Promise<IUser>;
  findByIdAndUpdatePassword(_id:string,password:string):Promise<IUser|void| null>
}
