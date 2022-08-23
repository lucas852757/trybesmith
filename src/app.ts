/* https://app.betrybe.com/course/live-lectures/sd-cohort-19-b#dia-263-express-com-typescript */
import express from 'express';
import routesProducts from '../routes/routes.products';
import routesUsers from '../routes/routes.users'; 
import routesOrders from '../routes/routes.orders';
import error from './middlewares/errorMiddlewares';
import routesLogin from '../routes/routes.login';
import Validator from './middlewares/validator';
import connection from './models/connection';

const app = express();
const validator = new Validator(connection);
app.use(express.json());
app.use('/login', routesLogin);
app.use('/products', routesProducts);
app.use('/users', routesUsers);
app.use('/orders', validator.validator, routesOrders);

app.use(error);
export default app;
