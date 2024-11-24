import { FindDriverByIdRepository, FindDriverByIdResponse } from "@/domain/repository/find-driver-by-id.repository";
import { driver } from "@/drivers.util";

export class FindDriverByIdRepositoryImpl implements FindDriverByIdRepository {


  execute(id: number): Promise<FindDriverByIdResponse | undefined> {
    const result = driver.find(drive => drive.id = id)
    return Promise.resolve(result)
  }

 
}