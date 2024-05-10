import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import clientsRouter from './resources/clients/client.router.js';
import orderRouter from './resources/Orders/orders.router.js';

const app = express();
const swaggerDocument = YAML.load('C:\\Student\\nodejs\\lab4\\basic-nodejs-mitso\\doc\\api.yaml');

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/clients', clientsRouter);
app.use('/Orders', orderRouter);

export default app;
