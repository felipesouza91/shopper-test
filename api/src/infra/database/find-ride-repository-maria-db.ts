import { RideModel } from "@/domain/models/ride.model";
import { FindRideRepository, FindRideRepositoryInput, FindRideRepositoryResponse } from "@/domain/repository/find-ride.repository";

export class FindRideRepositoryMariadbImpl implements FindRideRepository {
  
  
  async execute(input: FindRideRepositoryInput): Promise<FindRideRepositoryResponse[]> {
    let queryResult;
    if (input.driverId) {
      queryResult = await RideModel.findAll({
        where: {
          customer_id: input.customerId,
          driver_id: input.driverId
         }
      })
    } else {
      queryResult = await RideModel.findAll({
        where: {
          customer_id: input.customerId
         }
      })
    }
    const result = queryResult.map( ({dataValues}) => {
      const {createdAt, ...response } = dataValues
       return {
      ...response,
        date: createdAt
      }
    })
    return result
  }

}