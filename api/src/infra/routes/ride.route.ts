import { ConfirmRideController } from "@/controllers/confirm-ride/confirm-ride.controller";
import ConfirmRideServiceImpl from "@/services/confirm-ride.service";
import { Request, Response, Router } from "express";
import { z } from "zod";
import { SaveRideRepositoryImpl } from "../database/save-ride.repository";
import ZodValidation from "../middleware/validation.middleware";
import { FindDriverByIdRepositoryImpl } from './../database/find-driver-by-id.repository';


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
})

type RideConfirmationData = z.infer<typeof rideConfirmation>


rideRouter.patch("/", async (req: Request, res: Response) => {
  const validation = new ZodValidation<RideConfirmationData>(rideConfirmation)
  const saveRideRepository = new SaveRideRepositoryImpl()
  const findDriverByIdRepository = new FindDriverByIdRepositoryImpl()
  const confirmRideService = new ConfirmRideServiceImpl(saveRideRepository, findDriverByIdRepository)
  const controller = new ConfirmRideController(validation, confirmRideService)
  return controller.handle(req, res)
})


export { rideRouter };
