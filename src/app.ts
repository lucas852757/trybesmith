/* https://app.betrybe.com/course/live-lectures/sd-cohort-19-b#dia-263-express-com-typescript */
import express from 'express';
import routesProducts from '../routes/routes.products';
import routesUsers from '../routes/routes.users'; 
import routesOrders from '../routes/routes.orders';
import error from './middlewares/errorMiddlewares';
import routesLogin from '../routes/routes.login';

const app = express();

app.use(express.json());
app.use('/login', routesLogin);
app.use('/products', routesProducts);
app.use('/users', routesUsers);
app.use('/orders', routesOrders);

app.use(error);
export default app;
