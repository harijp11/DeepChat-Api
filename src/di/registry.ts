import { UserRepository } from "../repositories/userRepository";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { container } from "tsyringe";
import type { IUserService } from "../interfaces/services/IUserService";
import { UserService } from "../services/user/userService";
import { BcryptService } from "../utils/bcryptService";
import { JwtService } from "../utils/jwtService";
import { UserController } from "../controllers/userController";
import { IRefreshTokenRepository } from "../interfaces/repositories/IRefreshTokenRepository";
import { RefreshTokenRepository } from "../repositories/refreshTokenRepository";
import { IAuthService } from "../interfaces/services/IAuthService";
import { AuthService } from "../services/auth/authService";
import { AuthController } from "../controllers/authController";
import { IChatRepository } from "../interfaces/repositories/IChatRepository";
import { ChatRepository } from "../repositories/chatRepository";
import { IMessageRepository } from "../interfaces/repositories/IMessage";
import { MessageRepository } from "../repositories/messageRepository";

export class Registry {
  static register(): void {
    //Repositiory registry
    container.register<IUserRepository>("IUserRepository", {
      useClass: UserRepository,
    });

    container.register<IRefreshTokenRepository>("IRefreshTokenRepository", {
      useClass: RefreshTokenRepository,
    });

    container.register<IChatRepository>("IChatRepository", {
      useClass: ChatRepository,
    });

    container.register<IMessageRepository>("IMessageRepository", {
      useClass: MessageRepository,
    });

    //service registry

    container.register<IUserService>("IUserService", {
      useClass: UserService,
    });

    container.register<BcryptService>("BcryptService", {
      useClass: BcryptService,
    });

    container.register<JwtService>("JwtService", {
      useClass: JwtService,
    });

    container.register<IAuthService>("IAuthService", {
      useClass: AuthService,
    });

    //controller registry

    container.register<UserController>("UserController", {
      useClass: UserController,
    });
    container.register<AuthController>("AuthController", {
      useClass: AuthController,
    });
  }
}
