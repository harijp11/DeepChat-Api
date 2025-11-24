import { IUser } from "../models/IUser";

// src/interfaces/services/IAuthService.ts
export interface IAuthService {
   registerUser(
      name: string,
      email: string,
      phone: string,
      password: string
    ): Promise<{ user: IUser; }>;
  
   userLogin(
        email: string,
        password: string
      ): Promise<{ user: IUser,accessToken:string,refreshToken:string}>
  
  refreshToken(oldRefreshToken: string): Promise<{
    accessToken: string;
  }>;
}
