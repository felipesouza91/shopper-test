import { Controller } from "@/contracts/controller";
import { Validation } from "@/contracts/validation";
import { FindRide } from "@/domain/services/find-ride";
import { FindRideSchema } from "@/infra/routes/ride.route";
import { Request, Response } from "express";

type  QueryType = { driver_id: number }

export default class FindRideController implements Controller {

  constructor(
    private validation: Validation,
    private findRide: FindRide) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { params, query } = request
    const { driver_id } = query as QueryType
    const validateValue = this.validation.validate(params) as FindRideSchema
    const result = await this.findRide.execute({
      customer_id: validateValue.customer_id,
      driver_id: driver_id
    })
    return response.status(200).json(result)
  }
}
