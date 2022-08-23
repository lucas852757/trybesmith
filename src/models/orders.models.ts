import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import Order from '../../interfaces/order.interface';
import RegisterProducts from '../../interfaces/register.products';

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
    // console.log(r)
    return r as [];
  }

  public create = async (
    id:number, 
    // userId:number, 
    productsIds: number[],
  ):Promise<RegisterProducts> => {
    const queryOrder = 'insert into Trybesmith.Orders (userId) values (?)';
    const result = await this.connection.query<ResultSetHeader>(queryOrder, [id]);
    const { insertId } = result[0];
    console.log('--->', insertId);
    const result1 = await Promise.all(productsIds.map(async (productId) => {
      const queryProducts = 'update Trybesmith.Products set orderId=? where id=?';
      await this
        .connection.query<RowDataPacket[]>(queryProducts, [insertId, productId]);
      return productId;
    }));
    console.log(result1);
    return ({
      userId: id,
      productsIds: result1,
    });
  };
}