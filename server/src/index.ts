import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './router'

const app: Express = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3002;
const HOST: string = process.env.HOST ? process.env.HOST : 'localhost';


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`); // eslint-disable-line no-console
});
