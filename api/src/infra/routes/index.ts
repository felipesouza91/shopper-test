import { Router } from "express";
import estimateRoute from "./estimate.route";
import { rideRouter } from "./ride.route";

const appRoutes = Router();


appRoutes.use("/ride/estimate", estimateRoute)
appRoutes.use("/ride/confirm", rideRouter)


export default appRoutes
