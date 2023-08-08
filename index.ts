// index.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import { errorHandler, notFound } from './middleware';
import api from './src/routes';
import morganMiddleware from './src/middleware/morgan.middleware';
import dotenv from 'dotenv';
import sequelize from './database/config';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
async function connectToDb() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connectToDb()
// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(morganMiddleware);

app.use('/api/v1', api);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: 'Server Running fine',
    msg: '🥰'
  });
});
app.use(notFound);
app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
