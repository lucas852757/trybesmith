import { Pool, RowDataPacket } from 'mysql2/promise';
import LoginAcess from '../../interfaces/login.interface';
import LoginReturn from '../../interfaces/login.return.interface';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public login = async (object: LoginAcess):Promise<LoginReturn> => {
    const { username } = object;
    const query = 'select password, username from Trybesmith.Users';
    const [[result]] = await this.connection.query<RowDataPacket[]>(query, [username]);
    return result as LoginReturn;
  };
}