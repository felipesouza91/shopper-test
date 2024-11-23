import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../exceptions/validation-error";

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

  return response.status(500).json({
    error_code: 500,
    error_description: 'Internal server error',
  });
}