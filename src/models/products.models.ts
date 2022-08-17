import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../../interfaces/product.interface';
import Units from '../../interfaces/units.interface';
// import connection from './connection';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(object: Units): Promise<Product> {
    const { name, amount } = object;
    const query = 'insert into Trybesmith.Products (name, aount) values (?, ?)';
    const result = await this.connection.query<ResultSetHeader>(query, [name, amount]); 
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...object };
  }
}