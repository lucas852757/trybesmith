import jwt from 'jsonwebtoken';
import Register from '../../interfaces/register.interface';
import Token from '../../interfaces/token.interface';
import connection from '../models/connection';
import UserModel from '../models/users.models';
 
export default class UserService {
  model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async createUser(object: Register):Promise<Token> {
    const insertUser = await this.model.createUeser(object);

    const secret = process.env.JWT_SECRET;
    /* https://stackoverflow.com/questions/66328425/jwt-argument-of-type-string-undefined-is-not-assignable-to-parameter-of-typ */
    const token = jwt.sign({ data: insertUser }, secret as string);
    return { token };
  }
}