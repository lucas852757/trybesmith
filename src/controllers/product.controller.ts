import { Request, Response } from 'express';

import ProductService from '../services/products.service';

export default class ProductController {
  constructor(private productService = new ProductService()) {}

  public create = async (req: Request, res: Response) => {
    const { body } = req;
    const response = await this.productService.create(body);
    return res.status(201).json(response);
  };
}