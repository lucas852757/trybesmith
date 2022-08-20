import { Pool, RowDataPacket } from 'mysql2/promise';
import Order from '../../interfaces/order.interface';

export default class OrderModel { 
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll():Promise<[]> {
    // Seleciona a Order table
    const query = 'select * from Trybesmith.Orders';
    const [response] = await this.connection.query<RowDataPacket[]>(query);
    
    // Para cada order:
    const r = await Promise.all(response.map(async ({ id, userId }) => {
      const object: Order = { id: 0, userId: 0, productsIds: [] };
      object.id = id;
      object.userId = userId;
      
      // Seleciona o id do produto na Products table
      const query1 = 'select id as productsIds from Trybesmith.Products where orderId=?';
      const [row] = await this.connection.execute<RowDataPacket[]>(query1, [id]);
      
      row.map(({ productsIds }) => object.productsIds.push(productsIds));
      // object.productsIds.push(products);
      // console.log(id);
      // console.log(object.productsIds);
      return object;
    })); 
    console.log(r);
    return r as [];
  }
}