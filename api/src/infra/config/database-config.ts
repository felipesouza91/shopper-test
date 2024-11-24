import { Sequelize } from "sequelize";
import { AppDatabaseError } from "../../domain/exceptions/database-error";
import { envs } from "./envs";

const sequelizeAppConnection = new Sequelize(envs.DATABASE_URL!) 


export async function initializeDatabase() {
  try {
    if (envs.DATABASE_URL) {
      await sequelizeAppConnection.sync({force: true})
      await sequelizeAppConnection.authenticate()
      console.log("Database connection successful ")
    } else {
      throw new AppDatabaseError("Database url is required")
    }
  } catch (error: unknown) {
    console.error(error)
    process.exit(1)
  } 
}


export { sequelizeAppConnection };

