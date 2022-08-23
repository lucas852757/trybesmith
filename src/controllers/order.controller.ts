import { NextFunction, Request, Response } from 'express';
import NewFeatures from '../../interfaces/req.user.intererface';
import OrderService from '../services/orders.service';

export default class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (req: Request, res: Response) => {
    const response = await this.orderService.getAll();
    return res.status(200).json(response);
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const { body } = req;
      const { id, body } = (<NewFeatures>req);
      console.log(id, body);
      const response = await this.orderService.create(id, body);
      return res.status(201).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}