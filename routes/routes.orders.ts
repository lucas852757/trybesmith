import { Router } from 'express';
import OrderController from '../src/controllers/order.controller';
import Validator from '../src/middlewares/validator';
import connection from '../src/models/connection';

const validator = new Validator(connection);
const router = Router();
const orderController = new OrderController();

router.get('/', orderController.getAll);
router.post('/', validator.validator, orderController.create);

export default router;