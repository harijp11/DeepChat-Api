import type { IRefreshToken } from "../models/IRefreshToken";

export interface IRefreshTokenRepository {
  create(tokenData: Partial<IRefreshToken>): Promise<IRefreshToken>;
  findByToken(token: string): Promise<IRefreshToken | null>;
  deleteByToken(token: string): Promise<void>;
}
