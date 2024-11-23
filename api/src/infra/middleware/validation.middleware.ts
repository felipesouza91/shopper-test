import { Validation } from "@/contracts/validation";
import { ZodError, ZodSchema } from "zod";
import { ValidationError } from "../exceptions/validation-error";


export default class ZodValidation<T> implements Validation {

  constructor(private schema: ZodSchema<T>){}

  validate(data: T): T {
    try {
      const parsedValue = this.schema.parse(data)
      return parsedValue
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const path = error.errors[0].path
        let message = ''
        if (path) {
          message = `${path} - ${error.errors[0].message}`
        } else {
          message = error.errors[0].message
        }
        throw new ValidationError(`Error ao validar os campo: ${message}`)

      } 
      throw new ValidationError("Erro ao realizar validação")
    }
  }

} 