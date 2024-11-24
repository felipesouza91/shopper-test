import errorMiddleware from '@/infra/middleware/error.middleware';
import appRoutes from '@/infra/routes';
import cors from 'cors';
import express from 'express';


const app = express();
app.use(express.json())
app.use(cors())

app.use(appRoutes)


app.use(errorMiddleware);


export { app };
