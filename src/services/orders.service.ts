import Joi from 'joi';
import RegisterProducts from '../../interfaces/register.products';
import connection from '../models/connection';
import OrderModel from '../models/orders.models';

export default class OrderService {
  models: OrderModel;

  constructor() {
    this.models = new OrderModel(connection);
  }

  public async getAll():Promise<[]> {
    const result = await this.models.getAll();
    
    return result;
  }

  public create = async (
    id: number, 
    object: { productsIds:number[] },
  ): Promise<RegisterProducts> => {
    const { productsIds } = object;
    const schema = Joi.object({
      productsIds: Joi.array().items(Joi.number().required()).required()
        .messages({ 'array.includesRequiredUnknowns': '"productsIds" must include only numbers' }),
    });

    const { error } = schema.validate({ productsIds });
    console.log(error);
    await schema.validateAsync({ productsIds });
    const result = await this.models.create(id, productsIds);
    return result;
  };
}