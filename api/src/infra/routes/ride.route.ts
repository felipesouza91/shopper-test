import { Request, Response, Router } from "express";
import { z } from "zod";
import { validateData } from "../middleware/validation.middleware";


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



rideRouter.patch("/ride/confirm", validateData(confirmationRide), )