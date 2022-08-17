import Product from '../interfaces/product.interface';
import Units from '../interfaces/units.interface';
import connection from '../src/models/connection';
import ProductModel from '../src/models/products.models';

export default class ProductService {
  model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async create(object: Units): Promise<Product> {
    const result = await this.model.create(object);
    return result;
  }
}