import { Request, Response, Router } from "express";
import { FindAllDriverRepositoryMariadbImpl } from "../database/find-all-driver-maria-dm";

const driverRoutes = Router()



driverRoutes.get('/', async (req: Request, res: Response) => {
  const repository = new FindAllDriverRepositoryMariadbImpl()
  const result = await repository.execute()
  return res.status(200).json(result)
})


export { driverRoutes };
