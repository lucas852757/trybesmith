/* https://github.com/tryber/praticando-typescript-express/blob/main/atividade-4/src/controllers/restaurantController.ts */
import { Request, Response, NextFunction } from 'express';

import ProductService from '../services/products.service';

class ProductController {
  constructor(private productService = new ProductService()) {}

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const response = await this.productService.create(body);
      return res.status(201).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getAll = async (_req: Request, res: Response) => {
    const response = await this.productService.getAll();
    return res.status(200).json(response);
  };
}

export default ProductController;