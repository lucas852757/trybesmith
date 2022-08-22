/* source: https://bobbyhadz.com/blog/typescript-element-implicitly-has-any-type-expression */
import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import ErrorMiddleware from '../../interfaces/err.middleware.interface';

const errors = {
  ValidationError: 400,
  UnauthorizedUserError: 401,
  'string.min': 422,
  'string.base': 422,
  'any.required': 400,
};

const middlewareOfError = async (
  err: ErrorRequestHandler,
  req: Request, 
  res: Response, 
  _next: NextFunction,
) => {
  // console.log('------>', (<ErrorMiddleware>err).isJoi);
  // Joi
  if ((<ErrorMiddleware>err).isJoi) { // (<ErrorMiddleware>err).name
    const status = await errors[(<ErrorMiddleware>err).details[0].type as keyof typeof errors];
    /* if (!status) return res.sendStatus(500); */
    res.status(status).json({ message: (<ErrorMiddleware>err).message });
  } else {
    // Erros que não estão realicinados ao Joi
    const status = await errors[(<ErrorMiddleware>err).name as keyof typeof errors];
    res.status(status).json({ message: (<ErrorMiddleware>err).message });
  }
};

export default middlewareOfError;