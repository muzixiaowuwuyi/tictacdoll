import { Router } from "express";
import gameSession from "./controllers/eventController";
import userController from './controllers/userController';
import { authMiddleware } from "./middlewares/auth";
import { RequestWithPayload } from "./types";

const router = Router();

router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.login);

router.get("/sessions", gameSession.getGameSession);
router.post("/sessions", gameSession.addGameSession);

router.use(authMiddleware)
router.get('/authtest', (req : RequestWithPayload, res) => {
  res.status(200).send({message: 'Got through', user: req.userToken})
})

export default router;