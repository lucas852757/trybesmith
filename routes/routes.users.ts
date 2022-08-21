import { Router } from 'express';
import UserController from '../src/controllers/user.controller';
import LoginController from '../src/controllers/login.controller';

const router = Router();

const userController = new UserController();
const loginController = new LoginController();

router.post('/', loginController.login);
router.post('/', userController.createUser);

export default router;