import { Request, Response } from "express";

export interface Controller {
  handle(request: Request, resonse: Response): Promise<Response>
}