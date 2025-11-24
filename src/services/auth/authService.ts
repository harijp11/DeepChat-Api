import { inject, injectable } from "tsyringe";
import type { JwtPayload, JwtService } from "../../utils/jwtService";
import type { IRefreshTokenRepository } from "../../interfaces/repositories/IRefreshTokenRepository";
import { CustomError } from "../../shared/customError";
import { ErrorMessages } from "../../shared/constants";
import { HTTP_STATUS } from "../../shared/enums";
import type { IAuthService } from "../../interfaces/services/IAuthService";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { IUser } from "../../interfaces/models/IUser";
import { BcryptService } from "../../utils/bcryptService";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject("JwtService") private jwtService: JwtService,
    @inject("IRefreshTokenRepository")
    private refreshTokenRepository: IRefreshTokenRepository,
    @inject("IUserRepository") private userRepository: IUserRepository,
    @inject("BcryptService") private bcryptService: BcryptService
  ) {}

  async registerUser(
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<{ user: IUser }> {
    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) {
      throw new CustomError(
        ErrorMessages.EMAIL_ALREADY_EXISTS,
        HTTP_STATUS.CONFLICT
      );
    }

    const hashedPassword = await this.bcryptService.hashPassword(password);

    // create user
    const user = await this.userRepository.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const plainUser = user.toObject ? user.toObject() : user;

    delete plainUser.password;

    return { user: plainUser };
  }

  async userLogin(
    email: string,
    password: string
  ): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError(
        ErrorMessages.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const isPasswordValid = await this.bcryptService.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new CustomError(
        ErrorMessages.INVALID_CREDENTIALS,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const payload: JwtPayload = { _id: user._id.toString(), email: user.email };

    const accessToken = this.jwtService.generateAccessToken(payload);
    const refreshToken = this.jwtService.generateRefreshToken(payload);

    await this.refreshTokenRepository.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { user, accessToken, refreshToken };
  }

  async refreshToken(oldRefreshToken: string): Promise<{
    accessToken: string;
  }> {
    if (!oldRefreshToken) {
      throw new CustomError(
        ErrorMessages.REFRESH_TOKEN_INVALID,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const payload = this.jwtService.verifyToken(
      oldRefreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    );
    if (!payload || payload._id) {
      throw new CustomError(
        ErrorMessages.REFRESH_TOKEN_INVALID,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const storedToken = await this.refreshTokenRepository.findByToken(
      oldRefreshToken
    );
    if (!storedToken) {
      throw new CustomError(
        ErrorMessages.REFRESH_TOKEN_INVALID,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const accessToken = this.jwtService.generateAccessToken({
      _id: payload._id,
      email: payload.email,
    });

    storedToken.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await storedToken.save();

    return { accessToken };
  }
}
