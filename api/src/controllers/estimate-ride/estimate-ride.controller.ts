import { Controller } from "@/contracts/controller";
import { Validation } from "@/contracts/validation";
import { EstimateRide } from "@/domain/services/estimate-ride";
import { Request, Response } from "express";


export default class EstimateRideController implements Controller {
  
  constructor(
    private validation: Validation,
    private estimateRide: EstimateRide
  ) { }
  
  async handle(request: Request, response: Response): Promise<Response> {
    const { body } = request
    this.validation.validate(body)
    const result = await this.estimateRide.execute(body)
    return response.status(200).json(result)
  }
}