import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response, next:NextFunction) => {
    try {
      const { body } = req;
      const response = await this.loginService.login(body);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}