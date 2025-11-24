import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../shared/enums";
import { ErrorMessages } from "../shared/constants";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: ErrorMessages.ROUTE_NOT_FOUND || "Route not found",
  });
};
