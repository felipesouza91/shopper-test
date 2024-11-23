import { Router } from "express";
import estimateRoute from "./estimate.route";

const appRoutes = Router();


appRoutes.use("/ride/estimate", estimateRoute)


export default appRoutes
