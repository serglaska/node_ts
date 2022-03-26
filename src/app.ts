import express from 'express';
import { Request, Response, NextFunction } from 'express'
import todoRouters from './routes/route';
import { json } from 'body-parser';

const app = express();
app.use(json());
app.use('/todo', todoRouters);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message })
});

app.listen(3000);
