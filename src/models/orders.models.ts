import { Pool } from 'mysql2/promise';

export default class Orders { 
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll():Promise<[]> {
    const query = 'select  ord.userId, prod.id from Trybesmith.Orders as ord'
     + ' inner join Trybesmith.Products as prod on ord.userId = prod.orderId;';
    const [response] = await this.connection.query(query);
    return response as [];
  }
}