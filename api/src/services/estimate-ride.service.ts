import { CalculateRoutes } from "@/contracts/integration/calculate-routes";
import { FindAllDriverRepository } from "@/domain/repository/find-all-drivers.repository";
import { EstimateRide, EstimateRideDto, EstimateRideInput } from "@/domain/services/estimate-ride";

export class EstimateRideService implements EstimateRide {

  constructor(
    private calculateRouter: CalculateRoutes,
    private findAllDriverRepository: FindAllDriverRepository
  ) { }
  
  async execute(data: EstimateRideInput): Promise<EstimateRideDto> {
    const { resume, originalResponse } = await this.calculateRouter.execute(data.origin, data.destination)
    const drivers = await this.findAllDriverRepository.execute()
    const options = drivers.filter(driver => resume.distance/1000 > driver.minKm).map(driver => {
      const {tax, minKm ,...rest } = driver
      return {
        ...rest,
        value: Math.round(resume.distance/1000 * tax)
      }
    }).sort( (fist, next) => fist.value > next.value ? 1 : -1)
    const result: EstimateRideDto = {  
      ...resume,
      options,
      routeResponse: originalResponse
    }
    return result;
  }
  
}