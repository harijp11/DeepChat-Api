import { Request, Response, NextFunction } from "express";
import { JwtService } from "../utils/jwtService";
import { CustomError } from "../shared/customError";
import { HTTP_STATUS } from "../shared/enums";
import { ACCESS_TOKEN_SECRET, ErrorMessages } from "../shared/constants";
import { errorHandler } from "../shared/ErrorHandler";
import { AuthRequest } from "../utils/types/jwtType";


export const authMiddleware = (jwtService: JwtService) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      
      const token = req.cookies?.accessToken;

      if (!token) {
        throw new CustomError(ErrorMessages.TOKEN_MISSING, HTTP_STATUS.UNAUTHORIZED);
      }

      const payload = jwtService.verifyToken(token, ACCESS_TOKEN_SECRET );

      if (!payload) {
        throw new CustomError(ErrorMessages.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
      }

      (req as AuthRequest).user = payload as { _id: string; email: string };
      next();
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
          message: ErrorMessages.TOKEN_EXPIRED,
        });
        return;
      }
      errorHandler(err,res);
    }
  };
};
