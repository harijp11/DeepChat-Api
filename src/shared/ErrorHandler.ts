import { Response } from "express";
import { CustomError } from "./customError";

export function errorHandler(
  err: Error | CustomError,
  res: Response,
): void {
  console.error("ERR",err);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
