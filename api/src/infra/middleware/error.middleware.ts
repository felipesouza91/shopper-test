import { DriverMinKmError } from "@/domain/exceptions/driver-min-km-error";
import { DriverNotFoundError } from "@/domain/exceptions/driver-not-found-error";
import { InvalidDriverError } from "@/domain/exceptions/invalid-driver-error";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../domain/exceptions/validation-error";

export default function errorMiddleware(err: Error, request: Request, response: Response, next: NextFunction) {
  console.error(err)
  if (err instanceof SyntaxError) {
    console.log(err.stack)
    return response.status(400).json({
      error_code: 400,
      error_description: err.message,
    })
  }
  if (err instanceof ValidationError) {
    return response.status(400).json({
      error_code:"INVALID_DISTANCE",
      error_description:err.message
    })
  }
  if (err instanceof DriverNotFoundError ) {
    return response.status(404).json({
      error_code:"DRIVER_NOT_FOUND",
      error_description:err.message
    })
  }
  if (err instanceof InvalidDriverError ) {
    return response.status(406).json({
      error_code:"INVALID_DRIVER",
      error_description:err.message
    })
  }
  if (err instanceof DriverMinKmError ) {
    return response.status(406).json({
      error_code:"INVALID_DISTANCE",
      error_description:err.message
    })
  }
  return response.status(500).json({
    error_code: 500,
    error_description: 'Internal server error',
  });
}