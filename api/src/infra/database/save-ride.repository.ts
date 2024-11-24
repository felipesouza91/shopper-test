import { RideModel } from "@/domain/models/ride.model";
import { SaveRideInput, SaveRideRepository, SaveRideResponse } from "@/domain/repository/save-ride-repositoy";

export class SaveRideRepositoryImpl implements SaveRideRepository {

   async execute(input: SaveRideInput): Promise<SaveRideResponse> {
   const modelInit = await RideModel.create(input)
     const save = await modelInit.save()
     return {
       
     } as SaveRideResponse
  }

}