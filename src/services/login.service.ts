import Joi from 'joi';
import jwt from 'jsonwebtoken';
import LoginAcess from '../../interfaces/login.interface';
import Token from '../../interfaces/token.interface';
import connection from '../models/connection';
import LoginModel from '../models/login.models';

export default class LoginService {
  models: LoginModel;

  constructor() {
    this.models = new LoginModel(connection);
  }

  public login = async (object: LoginAcess): Promise<Token> => {
    const secret = 'suaSenhaSecreta';
    const result = await this.models.login(object);
    const { password, username } = object;
    const schema = Joi.object({
      password: Joi.string().not().empty().required(),
      username: Joi.string().not().empty().required(),
    });
    await schema.validateAsync({ password, username });
    if (!result.password || !result.username) {
      const error = new Error('Username or password invalid');
      error.name = 'UnauthorizedUserError';
    }
    
    const resultOb = await this.models.login(object);
    const token = jwt.sign({ data: resultOb }, secret as string);
    return { token };
  };
}