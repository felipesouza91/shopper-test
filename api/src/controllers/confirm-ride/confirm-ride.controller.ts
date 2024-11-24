import { Controller } from "@/contracts/controller";
import { Validation } from "@/contracts/validation";
import { ConfirmRideService } from "@/domain/services/ride-service";
import { Request, Response } from "express";

export class ConfirmRideController implements Controller{

  constructor(
    private validation: Validation,
    private confirmRideService: ConfirmRideService) { }
  
  async handle(request: Request, response: Response): Promise<Response> {
    const { body } = request
    this.validation.validate(body)
    await this.confirmRideService.execute(body)
    return response.status(200).json({
      "success": true
    })
  } 


}