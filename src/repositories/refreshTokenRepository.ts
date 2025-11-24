import { injectable } from "tsyringe";
import { RefreshTokenModel } from "../models/RefreshTokenSchema";
import type { IRefreshTokenRepository } from "../interfaces/repositories/IRefreshTokenRepository";
import type { IRefreshToken } from "../interfaces/models/IRefreshToken";

@injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  async create(tokenData: Partial<IRefreshToken>): Promise<IRefreshToken> {
    const tokenDoc = new RefreshTokenModel(tokenData);
    return tokenDoc.save();
  }

  async findByToken(token: string): Promise<IRefreshToken | null> {
    return RefreshTokenModel.findOne({ token }).exec();
  }

  async deleteByToken(token: string): Promise<void> {
    await RefreshTokenModel.deleteOne({ token }).exec();
  }
}
