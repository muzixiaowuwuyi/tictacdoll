import { Router } from "express";
import gameSession from "./controllers/eventController";

const router = Router();

router.get("/sessions", gameSession.getGameSession);
router.post("/sessions", gameSession.addGameSession);

export default router;