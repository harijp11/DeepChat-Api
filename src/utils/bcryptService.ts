import bcrypt from "bcrypt";
import { injectable } from "tsyringe";

@injectable()
export class BcryptService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }   
}
   