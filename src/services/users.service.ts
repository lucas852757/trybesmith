import Joi from 'joi';
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
    const { username, classe, level, password } = object;
    const schema = Joi.object({
      username: Joi.string().min(3).not().empty()
        .required(), 
      classe: Joi.string().min(3).not().empty()
        .required(),
      level: Joi.number().min(1).not().empty()
        .required(),
      password: Joi.string().min(8).required() });
    await schema.validateAsync({ username, classe, level, password });
    
    const insertUser = await this.model.createUeser(object);
    // const secret = process.env.JWT_SECRET;
    const secret = 'suaSenhaSecreta';
    /* https://stackoverflow.com/questions/66328425/jwt-argument-of-type-string-undefined-is-not-assignable-to-parameter-of-typ */
    const token = jwt.sign({ data: insertUser }, secret as string);
    return { token };
  }
}