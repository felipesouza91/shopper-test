import { Controller } from "@/contracts/controller";
import { ConfirmRideService } from "@/domain/services/ride-service";
import { Request, Response } from "express";

export class ConfirmRideController implements Controller{

  constructor(private confirmRideService: ConfirmRideService) { }
  
  handle(request: Request, response: Response): Promise<Response> {
    
  }


}