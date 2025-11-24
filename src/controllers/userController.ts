import type { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import type { IUserService } from "../interfaces/services/IUserService";
import { errorHandler } from "../shared/ErrorHandler";
import { CustomError } from "../shared/customError";
import { SuccessMessages, ErrorMessages } from "../shared/constants";
import { HTTP_STATUS } from "../shared/enums";
import { AuthRequest } from "../utils/types/jwtType";

@injectable()
export class UserController {
  constructor(@inject("IUserService") private userService: IUserService) {}

 

  async editProfile(req: AuthRequest, res: Response) {
    try {
      const user = req.body;
      const _id = req.user?._id.toString() || "";
      await this.userService.editProfile(user, _id);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SuccessMessages.PROFILE_UPDATED,
      });
    } catch (error: any) {
      errorHandler(error, res);
    }
  }

  async changePassword(req: AuthRequest, res: Response) {
    try{
      const {oldPass,newPass} = req.body
      const _id = req.user?._id.toString() || "";

      await this.userService.changePassword(_id,oldPass,newPass)

      res.status(HTTP_STATUS.OK).json({
        success:true,
        message:SuccessMessages.PASSWORD_CHANGED
      })

    }catch(error:any){
      errorHandler(error,res)
    }
  }
}
