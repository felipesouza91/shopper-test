import { DriverModel } from "@/domain/models/driver.model";
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
        },
        include: {
          model: DriverModel,
          attributes: ['id', 'name']
        }
      })
    } else {
      queryResult = await RideModel.findAll({
        where: {
          customer_id: input.customerId
        },
        include: {
          model: DriverModel,
          attributes: ['id', 'name']
        }
      })
    }
    const result = queryResult.map( ({dataValues}) => {
      const {createdAt, driver_id, driver: driverEntity, ...response } = dataValues
       return {
         ...response,
         driver: {
           id: driverEntity.dataValues.id,
           name: driverEntity.dataValues.name,
         },
        date: createdAt
      }
    })
    return result
  }

}