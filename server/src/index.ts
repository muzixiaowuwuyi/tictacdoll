import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './router'

const app: Express = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3002;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // eslint-disable-line no-console
});
