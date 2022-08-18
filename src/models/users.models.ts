import { Pool, ResultSetHeader } from 'mysql2/promise';
import Register from '../../interfaces/register.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async createUeser(object: Register):Promise<Register> {
    const { username, classe, level, password } = object;
    const query = 'insert into Trybesmith.User (username, classe, level, password)';
    const result = await this.connection.query<ResultSetHeader>(query, [username, 
      classe, level, password]);
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...object };
  }
}