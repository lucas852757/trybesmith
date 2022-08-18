/* https://app.betrybe.com/course/live-lectures/sd-cohort-19-b#dia-263-express-com-typescript */
import express from 'express';
import routesProducts from '../routes/routes.products';

const app = express();

app.use(express.json());
app.use('/products', routesProducts);

export default app;
