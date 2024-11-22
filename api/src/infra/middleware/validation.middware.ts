import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

export function validateData(schema: z.ZodObject<any, any>) {
    
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const path = error.errors[0].path
        let message = ''
        if (path) {
          message = `${path} - ${error.errors[0].message}`
        } else {
          message = error.errors[0].message
        }
        return res.status(400).json({
          error_code: "INVALID_DATA",
          error_description: `Error ao validar os campo: ${message}`
        });
      } 
      return error
    }
   }
  }

