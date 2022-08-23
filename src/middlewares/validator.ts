/* source:  https://app.betrybe.com/course/back-end/nodejs-orm-autenticacao/jwt-json-web-token/acf1c24f-d531-4cf0-be9b-2384e37799d7/conteudos/d22aa12a-a9fd-448f-865a-ec8de7f521e6/implementando-jwt/b81401e2-ade1-4d90-94b9-e6d971915d36?use_case=next_button */

/* source: https://stackoverflow.com/questions/50735675/typescript-jwt-verify-cannot-access-data */
/* source: https://app.betrybe.com/course/back-end/typescript/tipagem-estatica-e-generics/68eccf60-a982-4455-837d-da31e8726be5/conteudos/92d81f61-aeb5-4bb6-af7f-ee4563c35254/interfaces/e1518fcd-2908-44df-a5bf-6dcd6dcb541f?use_case=side_bar */

import { Request, Response, NextFunction } from 'express';
import { Pool, RowDataPacket } from 'mysql2/promise';
import jsonWebToken, { JwtPayload } from 'jsonwebtoken';
// import JwtVerify from '../../interfaces/jwt.verify.interface';
import NewFeatures from '../../interfaces/req.user.intererface';

const secret = 'suaSenhaSecreta';

export default class Validator {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public validator = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Token not found' });
    }
    console.log(token);
    try {
      const decoded = jsonWebToken.verify(token, secret) as JwtPayload;
    
      const { username } = decoded.data;
      const query = 'select id, username, password from Trybesmith.Users where username=?';
      const [[object]] = await this.connection.query<RowDataPacket[]>(query, [username]);
      if (!object.username || !object.password) {
        res.status(401).json({ message: 'Username or password invalid' });
      } 
      // (<NewFeatures>req).user = object.username;
      // (<NewFeatures>req).password = object.password;
      (<NewFeatures>req).id = object.id;
      next();
    } catch (error) {
      // console.log(error);
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  };
}
