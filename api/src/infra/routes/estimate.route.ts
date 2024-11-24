import EstimateRideController from "@/controllers/estimate-ride/estimate-ride.controller";
import ZodValidation from "@/infra/middleware/validation.middleware";
import GoogleMapService from "@/services/google-map.service";
import { RoutesClient } from "@googlemaps/routing";
import { Request, Response, Router } from "express";
import { z } from "zod";
import { envs } from "../config/envs";

const estimateRoute = Router()

const estimateRateShema = z.object({
  customer_id: z.string({message: "Campo Obrigatorio"}),
  origin: z.string({message: "Campo Obrigatorio"}),
  destination: z.string({message: "Campo Obrigatorio"})
}).refine(schema => schema.origin != schema.destination, "Os campos origin e destination não podem ser iguais");

type EstimateRateInput = z.infer<typeof estimateRateShema>
const routingClient = new RoutesClient({
  apiKey: envs.GOOGLE_MAPS_API,
})


estimateRoute.post('/', async (req: Request, res: Response) => {
  const validation = new ZodValidation<EstimateRateInput>(estimateRateShema)
  const calculateRoute = new GoogleMapService(routingClient)
  const estimateRateController = new EstimateRideController(validation, calculateRoute)

  return await estimateRateController.handle(req, res)
})


export default estimateRoute
