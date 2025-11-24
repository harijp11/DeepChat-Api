import { Router } from "express";
import { JwtService } from "../utils/jwtService";

import { authMiddleware } from "../middlewares/authMiddleware";
import { controllers } from "../di/index";

const jwtService = new JwtService();

const { userController, authController } = controllers;

const router = Router();

router.put(
  "/edit-profile",
  authMiddleware(jwtService),
  userController.editProfile.bind(userController)
);

router.patch(
  "/change-password",
  authMiddleware(jwtService),
  userController.changePassword.bind(userController)
);

export default router;
