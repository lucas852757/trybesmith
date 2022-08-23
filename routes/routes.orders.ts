import { Router } from 'express';
import OrderController from '../src/controllers/order.controller';

const router = Router();
const orderController = new OrderController();

router.get('/', orderController.getAll);
router.post('/', orderController.create);

export default router;