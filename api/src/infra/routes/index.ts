import { Router } from "express";
import { rideRouter } from "./ride.route";

const appRoutes = Router();

appRoutes.use("/ride", rideRouter)


export default appRoutes
