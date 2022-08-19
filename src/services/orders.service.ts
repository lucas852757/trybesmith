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
}