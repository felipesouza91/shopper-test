import { Router } from "express";
import { driverRoutes } from "./driver.route";
import { rideRouter } from "./ride.route";

const appRoutes = Router();

appRoutes.use("/ride", rideRouter)
appRoutes.use("/drivers", driverRoutes)


export default appRoutes
