import { Router } from "express";
import gameSession from "./controllers/eventController";
import userController from './controllers/userController';

const router = Router();

router.post('/users', userController.registerUser);

router.get("/sessions", gameSession.getGameSession);
router.post("/sessions", gameSession.addGameSession);

export default router;