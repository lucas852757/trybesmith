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

  public create = async (id: number, object: { productsIds:[] }): Promise<RegisterProducts> => {
    const { productsIds } = object;
    const result = await this.models.create(id, productsIds);
    return result;
  };
}