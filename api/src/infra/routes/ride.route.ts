import { RideModel } from "@/domain/models/ride.model";
import { Request, Response, Router } from "express";
import { z } from "zod";


const rideRouter = Router()

const confirmationRide = z.object({
  customer_id: z.string({message: "Campo Obrigatorio"}),
  origin: z.string({message: "Campo Obrigatorio"}),
  destination: z.string({ message: "Campo Obrigatorio" }),
  distance: z.number({message: "Campo obrigatorio"}),
  duration: z.number({message: "Campo obrigatorio"}),
  driver: z.object({
    id: z.number(),
    name: z.string()
  }).required(),
  value: z.number()
})



rideRouter.patch("/", async (req: Request, res: Response) => {
  const modelInit = await RideModel.create({})
     const save = await modelInit.save()
  return res.status(200).json()
})


export { rideRouter };
