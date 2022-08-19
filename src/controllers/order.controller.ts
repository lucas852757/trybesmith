import { Request, Response } from 'express';
import OrderService from '../services/orders.service';

export default class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (req: Request, res: Response) => {
    const response = await this.orderService.getAll();
    return res.status(200).json(response);
  };
}