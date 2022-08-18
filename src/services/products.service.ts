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
    const result = await this.model.create(object);
    return result;
  }

  public async getAll():Promise<Product[]> {
    const result = await this.model.getAll();
    return result;
  }
}