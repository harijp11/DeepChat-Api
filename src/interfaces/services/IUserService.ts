import type { IUser } from "../models/IUser";

export interface IUserService {

    editProfile(user:IUser,_id:string):Promise<void | IUser>
    changePassword(userId:string,oldPass:string,newPass:string):Promise<void | IUser>
}
