import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../shared/constants";

export interface JwtPayload {
  email: string;
  _id: string;
}

@injectable()
export class JwtService {
  generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  }

  generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  }

  verifyToken(token: string, secret: string): JwtPayload | null {
    try {
      return jwt.verify(token, secret) as JwtPayload;
    } catch {
      return null;
    }
  }
}
