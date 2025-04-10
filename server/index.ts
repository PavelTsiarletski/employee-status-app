import express from 'express';
import cors from 'cors';
import usersRouter from './routes/usersRoute';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
