import { Router } from 'express';
import gameSession from './controllers/game';
import userController from './controllers/user';
import { authMiddleware } from './middlewares/auth';

const router = Router();

router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.login);

router.get('/sessions', gameSession.getGameSession);
router.post('/sessions', gameSession.addGameSession);

router.use(authMiddleware);

router.get('/auth', (req, res) => res.status(200).send({message: 'Authorised'}));
router.post('/user/logout', userController.logout);

export default router;
