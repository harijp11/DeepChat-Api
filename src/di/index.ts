import { container } from "tsyringe";
import { Registry } from "./registry";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";


export class DependencyInjection {
    static registerAll(): void {
        Registry.register();
    }
}


DependencyInjection.registerAll()
export const controllers = {
  userController: container.resolve(UserController),
  authController:container.resolve(AuthController)
};