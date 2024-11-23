import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import errorMiddleware from './infra/middleware/error.middleware';
import appRoutes from './infra/routes';



const port = process.env.PORT || 8080;
const app = express();

app.use(express.json())
app.use(cors())

app.use(appRoutes)


app.use(errorMiddleware);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});