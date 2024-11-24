import { Controller } from "@/contracts/controller";
import { CalculateRoutes } from "@/contracts/integration/calculate-routes";
import { Validation } from "@/contracts/validation";
import { driver } from "@/drivers.util";
import { Request, Response } from "express";


export default class EstimateRideController implements Controller {
  
  constructor(
    private validation: Validation,
    private calculateRouter: CalculateRoutes
  ) { }
  
  async handle(request: Request, response: Response): Promise<Response> {
    const { body } = request
    this.validation.validate(body)
    const {resume, originalResponse } = await this.calculateRouter.execute(body.origin, body.destination)
    const options = driver.filter(driver => resume.distance/1000 > driver.minKm).map(driver => {
      const {tax, minKm ,...rest } = driver
      return {
        ...rest,
        value: resume.distance/1000 * tax
      }
    }).sort( (fist, next) => fist.value > next.value ? 1 : -1)
    const data = {  
      ...resume,
      options,
    }
    return response.status(200).json({
      ...data,
      routeResponse: originalResponse
    })
  }
}