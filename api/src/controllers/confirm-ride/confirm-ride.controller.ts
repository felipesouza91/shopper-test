import { Controller, HttpRequest, HttpResponse } from "@/contracts/controller";
import { ConfirmRideService } from "@/contracts/services/ride-service";

export class ConfirmRideController implements Controller{

  constructor(private confirmRideService: ConfirmRideService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body } = request;
    await this.confirmRideService.executer(body)
  }

}