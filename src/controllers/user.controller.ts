import { Request, Response, NextFunction } from 'express';
import UserService from '../services/users.service';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const response = await this.userService.createUser(body);
      return res.status(201).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}