import { InvalidDriverError } from "@/domain/exceptions/invalid-driver-error";
import { RidesNotFoundError } from "@/domain/exceptions/rides-not-found-error";
import { FindDriverByIdRepository } from "@/domain/repository/find-driver-by-id.repository";
import { FindRideRepository } from "@/domain/repository/find-ride.repository";
import { FindRide, FindRideInput, FindRideResponse } from "@/domain/services/find-ride";

export class FindRideService implements FindRide {

  constructor(
    private findDriverByIdRepository: FindDriverByIdRepository,
    private findRidesRepository: FindRideRepository) { }

  async execute(data: FindRideInput): Promise<FindRideResponse> {

    if (data.driver_id) {
      const findDriver = await this.findDriverByIdRepository.execute(data.driver_id)
      if (!findDriver) {
        throw new InvalidDriverError("O motorista não foi encontrado")
      }
    }
    const result = await this.findRidesRepository.execute({
      customerId: data.customer_id,
      driverId: data.driver_id
    })
    if (result.length === 0) {
      throw new RidesNotFoundError("Não existes corridas com os dados informados")
    }
    return {
      customer_id: data.customer_id,
      rides: result
    }
  }
  
}