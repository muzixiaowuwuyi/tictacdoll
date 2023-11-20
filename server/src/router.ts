import { Router } from "express";
import gameSession from "./controllers/eventController";
import userController from './controllers/userController';

const router = Router();

router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.login);

router.get("/sessions", gameSession.getGameSession);
router.post("/sessions", gameSession.addGameSession);

export default router;