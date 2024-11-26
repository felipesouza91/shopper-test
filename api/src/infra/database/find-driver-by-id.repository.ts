import { DriverModel } from "@/domain/models/driver.model";
import { FindDriverByIdRepository, FindDriverByIdResponse } from "@/domain/repository/find-driver-by-id.repository";

export class FindDriverByIdRepositoryMariadbImpl implements FindDriverByIdRepository {


  async execute(id: number): Promise<FindDriverByIdResponse | undefined> {
    const queryResult = await DriverModel.findByPk(id)
    if (queryResult === null) {
      return undefined
    }
    const result: FindDriverByIdResponse = {
      id: queryResult.dataValues.id,
      description: queryResult.dataValues.description,
      minKm: queryResult.dataValues.minKm,
      name: queryResult.dataValues.name,
      review: {
        comment: queryResult.dataValues.comment,
        rating: queryResult.dataValues.rating
      },
      tax: queryResult.dataValues.tax,
      vehicle: queryResult.dataValues.vehicle
    }
    return result
  }

 
}