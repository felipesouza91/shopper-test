import { Controller, HttpRequest, HttpResponse } from "@/contracts/controller";
import { CalculateRoutes } from "@/contracts/integration/calculate-routes";
import { driver } from "@/drivers.util";


export class EstimateRideController implements Controller {
  
  constructor(private calculateRouter: CalculateRoutes){}
  
  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const {resume, originalResponse } = await this.calculateRouter.execute(body.origin, body.destination)
    const options = driver.filter(driver => resume.distance/1000 > driver.minKm).map(driver => {
      const {tax, minKm ,...rest } = driver
      return {
        ...rest,
        value: resume.distance/1000 * tax
      }
    })
    const data = {  
      ...resume,
      options,
    }
    return {
      statusCode: 200,
      body: {
        ...data,
        routeResponse: originalResponse
      }
    }
  }
}