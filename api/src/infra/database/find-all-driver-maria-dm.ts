import { DriverModel } from "@/domain/models/driver.model";
import { FindAllDriverRepository } from "@/domain/repository/find-all-drivers.repository";
import { FindDriverByIdResponse } from "@/domain/repository/find-driver-by-id.repository";

export class FindAllDriverRepositoryMariadbImpl implements FindAllDriverRepository {


  async execute(): Promise<FindDriverByIdResponse[]> {
    const queryResult = await DriverModel.findAll()
    const result = queryResult.map(({ dataValues }) => {
      return {
        id: dataValues.id,
        description: dataValues.description,
        minKm: dataValues.minKm,
        name: dataValues.name,
        review: {
          comment: dataValues.comment,
          rating: dataValues.rating
        },
        tax: dataValues.tax,
        vehicle: dataValues.vehicle
      }
    })
    return result
  }

 
}