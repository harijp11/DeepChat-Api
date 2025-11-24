import { inject, injectable } from "tsyringe";
import type { IUser } from "../../interfaces/models/IUser";
import type { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import type { IUserService } from "../../interfaces/services/IUserService";
import { BcryptService } from "../../utils/bcryptService";
import { CustomError } from "../../shared/customError";
import { ErrorMessages } from "../../shared/constants";
import { HTTP_STATUS } from "../../shared/enums";
import { UserModel } from "../../models/UserSchema";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject("IUserRepository") private userRepository: IUserRepository,
    @inject("BcryptService") private bcryptService: BcryptService,
  ) {}

 

  async editProfile(user: IUser, _id: string): Promise<void | IUser> {
    const updatedUser = await this.userRepository.findByIdAndUpdate(_id, user);

    if (!updatedUser) {
      throw new CustomError(
        ErrorMessages.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    return updatedUser;
  }

  

  async changePassword(
    userId: string,
    oldPass: string,
    newPass: string
  ): Promise<void | IUser> {
    const UserExist = await UserModel.findById(userId);

    if (!UserExist) {
      throw new CustomError(
        ErrorMessages.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const isValid = await this.bcryptService.comparePassword(
      oldPass,
      UserExist?.password
    );

    if (!isValid) {
      throw new CustomError(
        ErrorMessages.INCORRECT_PASSWORD,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const hashedPassword = await this.bcryptService.hashPassword(newPass);

    await this.userRepository.findByIdAndUpdatePassword(userId, hashedPassword);
  }
}
