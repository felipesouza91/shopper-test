import { EstimateRideController } from '@/controllers/estimate-ride/estimate-ride.controller';
import { validateData } from '@/infra/middleware/validation.middware';
import { GoogleMapService } from '@/services/intergration/google-map.service';
import { RoutesClient } from '@googlemaps/routing';
import cors from 'cors';
import dotenv from "dotenv";
import express, { Request, Response } from 'express';
import 'express-async-errors';
import { z } from 'zod';


dotenv.config();

const routingClient = new RoutesClient({
  apiKey: process.env.GOOGLE_API_KEY,
  
})

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json())
app.use(cors())

const estimateRateShema = z.object({
  customer_id: z.string({message: "Campo Obrigatorio"}),
  origin: z.string({message: "Campo Obrigatorio"}),
  destination: z.string({message: "Campo Obrigatorio"})
}).refine(schema => schema.origin != schema.destination, "Os campos origin e destination não podem ser iguais");


const calculateRoute = new GoogleMapService(routingClient)
const estimateRateController = new EstimateRideController(calculateRoute)

app.post('/ride/estimate', validateData(estimateRateShema), async (req: Request, res: Response) => {
  const { body } = req
  const {statusCode, body: result} = await estimateRateController.handle({ body });
  return  res.status(statusCode).json(result)
})


app.patch("/ride/confirm")

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
 
  if (err instanceof SyntaxError) {
    console.log(err.stack)
    return response.status(400).json({
      error_code: 400,
      error_description: err.message,
    })
  }
  
  return response.status(500).json({
    error_code: 500,
    error_description: 'Internal server error',
  });
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});