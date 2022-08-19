import { Router } from 'express';
import OrderController from '../src/controllers/order.controller';

const router = Router();

const userController = new OrderController();

router.post('/', userController.getAll);

export default router;