import { Router } from "express";
import { controllers } from "../di/index";
import { authMiddleware } from "../middlewares/authMiddleware";
import { JwtService } from "../utils/jwtService";
const jwtService = new JwtService();

const router = Router();

const { userController, authController } = controllers;

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post(
  "/logout",
  authMiddleware(jwtService),
  authController.logoutUser.bind(authController)
);
router.post("/refresh-token", (req, res) =>
  authController.refreshToken(req, res)
);

export default router;
