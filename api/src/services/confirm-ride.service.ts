import { DriverMinKmError } from "@/domain/exceptions/driver-min-km-error";
import { DriverNotFoundError } from "@/domain/exceptions/driver-not-found-error";
import { FindDriverByIdRepository } from "@/domain/repository/find-driver-by-id.repository";
import { SaveRideRepository } from "@/domain/repository/save-ride-repositoy";
import { ConfirmRide, ConfirmRideServiceInput } from "@/domain/services/ride-service";

export default class ConfirmRideServiceImpl implements ConfirmRide {

  constructor(
    private confirmRideRepository: SaveRideRepository,
    private findDriverByIdRepository: FindDriverByIdRepository) { }

  async execute(data: ConfirmRideServiceInput): Promise<void> {
    const {  driver,...input } = data
    const findDriver = await this.findDriverByIdRepository.execute(driver.id)
    if (!findDriver) {
      throw new DriverNotFoundError("O motorista não foi encontrado")
    }
    if (input.distance/1000 < findDriver.minKm) {
      throw new DriverMinKmError("A km da viagem esta abaixo do minimo do motorista solicitados")
    }
    await this.confirmRideRepository.execute({
      ...input,
      driver_id: driver.id
    })
  }
  
}