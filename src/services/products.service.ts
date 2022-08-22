import Joi from 'joi';
import Product from '../../interfaces/product.interface';
import Units from '../../interfaces/units.interface';
import connection from '../models/connection';
import ProductModel from '../models/products.models';

export default class ProductService {
  model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async create(object: Units): Promise<Product> {
    const { name, amount } = object;
    const schema = Joi.object({ 
      name: Joi.string().min(3).not().empty()
        .required(), 
      amount: Joi.string().min(3).not().empty()
        .required() });
    await schema.validateAsync({ name, amount });
    const result = await this.model.create(object);
    return result;
  }

  public async getAll():Promise<Product[]> {
    const result = await this.model.getAll();
    return result;
  }
}