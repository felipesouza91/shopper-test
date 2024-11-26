import { ConfirmRideController } from "@/controllers/confirm-ride/confirm-ride.controller";
import EstimateRideController from "@/controllers/estimate-ride/estimate-ride.controller";
import FindRideController from "@/controllers/find-ride/find-ride.controller";
import ConfirmRideServiceImpl from "@/services/confirm-ride.service";
import { EstimateRideService } from "@/services/estimate-ride.service";
import { FindRideService } from "@/services/find-ride.service";
import GoogleMapService from "@/services/google-map.service";
import { RoutesClient } from "@googlemaps/routing";
import { Request, Response, Router } from "express";
import { z } from "zod";
import { envs } from "../config/envs";
import { FindAllDriverRepositoryMariadbImpl } from "../database/find-all-driver-maria-dm";
import { FindRideRepositoryMariadbImpl } from "../database/find-ride-repository-maria-db";
import { SaveRideRepositoryMariadbImpl } from "../database/save-ride.repository";
import ZodValidation from "../middleware/validation.middleware";
import { FindDriverByIdRepositoryMariadbImpl } from './../database/find-driver-by-id.repository';

const rideRouter = Router()

const rideConfirmation = z.object({
  customer_id: z.string({message: "Campo Obrigatorio"}),
  origin: z.string({message: "Campo Obrigatorio"}),
  destination: z.string({ message: "Campo Obrigatorio" }),
  distance: z.number({message: "Campo obrigatorio"}),
  duration: z.string({message: "Campo obrigatorio"}),
  driver: z.object({
    id: z.number(),
    name: z.string()
  }).required(),
  value: z.number()
}).refine(schema => schema.origin != schema.destination, "Os campos origin e destination não podem ser iguais");

const estimateRateShema = z.object({
  customer_id: z.string({message: "Campo Obrigatorio"}),
  origin: z.string({message: "Campo Obrigatorio"}),
  destination: z.string({message: "Campo Obrigatorio"})
}).refine(schema => schema.origin != schema.destination, "Os campos origin e destination não podem ser iguais");

const findRideSchema = z.object({
  customer_id: z.string()
})

type RideConfirmationSchema= z.infer<typeof rideConfirmation>
type EstimateRateSchema = z.infer<typeof estimateRateShema>
export type FindRideSchema = z.infer<typeof findRideSchema>

const routingClient = new RoutesClient({
  apiKey: envs.GOOGLE_MAPS_API,
})


rideRouter.post('/estimate', async (req: Request, res: Response) => {
  const validation = new ZodValidation<EstimateRateSchema>(estimateRateShema)
  const calculateRoute = new GoogleMapService(routingClient)
  const findAllDriverRepository = new FindAllDriverRepositoryMariadbImpl()
  const estimateRideService = new EstimateRideService(calculateRoute, findAllDriverRepository)
  const estimateRateController = new EstimateRideController(validation, estimateRideService)
  return await estimateRateController.handle(req, res)
})

rideRouter.patch("/confirm", async (req: Request, res: Response) => {
  const validation = new ZodValidation<RideConfirmationSchema>(rideConfirmation)
  const saveRideRepository = new SaveRideRepositoryMariadbImpl()
  const findDriverByIdRepository = new FindDriverByIdRepositoryMariadbImpl()
  const confirmRideService = new ConfirmRideServiceImpl(saveRideRepository, findDriverByIdRepository)
  const controller = new ConfirmRideController(validation, confirmRideService)
  return controller.handle(req, res)
})

rideRouter.get("/:customer_id", async (req: Request, res: Response) => {
  const validation = new ZodValidation<FindRideSchema>(findRideSchema)
  const findDriverByIdRepository = new FindDriverByIdRepositoryMariadbImpl()
  const findRideRepository = new FindRideRepositoryMariadbImpl()
  const findService = new FindRideService(findDriverByIdRepository, findRideRepository)
  const controller = new FindRideController(validation, findService)
  return controller.handle(req, res)
})


export { rideRouter };
