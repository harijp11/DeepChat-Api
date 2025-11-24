import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import type { IAuthService } from "../interfaces/services/IAuthService";
import { errorHandler } from "../shared/ErrorHandler";
import { CustomError } from "../shared/customError";
import { HTTP_STATUS } from "../shared/enums";
import {
  ErrorMessages,
  REFRESH_TOKEN_SECRET,
  SuccessMessages,
} from "../shared/constants";
import { JwtPayload, JwtService } from "../utils/jwtService";

@injectable()
export class AuthController {
  constructor(
    @inject("IAuthService") private authService: IAuthService,
    @inject("JwtService") private jwtService: JwtService
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, password } = req.body;

      if (!name || !email || !phone || !password) {
        throw new CustomError(
          ErrorMessages.INVALID_INPUT,
          HTTP_STATUS.BAD_REQUEST
        );
      }

      const result = await this.authService.registerUser(
        name,
        email,
        phone,
        password
      );

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SuccessMessages.USER_REGISTERED,
        data: result,
      });
    } catch (error: any) {
      errorHandler(error, res);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new CustomError(
          ErrorMessages.EMAIL_OR_PASSWORD_MISSING,
          HTTP_STATUS.BAD_REQUEST
        );
      }

      const { user, accessToken, refreshToken } =
        await this.authService.userLogin(email, password);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SuccessMessages.LOGIN_SUCCESS,
        data: user,
      });
    } catch (error: any) {
      errorHandler(error, res);
    }
  }

  
  async logoutUser(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });


      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SuccessMessages.LOGOUT_SUCCESS,
      });
    } catch (error:any) {
     errorHandler(error,res)
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const oldRefreshToken = req.cookies?.refreshToken;

      if (!oldRefreshToken) {
        throw new CustomError(
          ErrorMessages.REFRESH_TOKEN_INVALID,
          HTTP_STATUS.UNAUTHORIZED
        );
      }

      const payload = this.jwtService.verifyToken(
        oldRefreshToken,
        REFRESH_TOKEN_SECRET
      );

      if (!payload) {
        throw new CustomError(
          ErrorMessages.INVALID_TOKEN,
          HTTP_STATUS.UNAUTHORIZED
        );
      }
      const newPayload: JwtPayload = { _id: payload._id, email: payload.email };
      const accessToken = this.jwtService.generateAccessToken(newPayload);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SuccessMessages.TOKEN_REFRESHED,
      });
    } catch (error: any) {
      errorHandler(error, res);
    }
  }
}
