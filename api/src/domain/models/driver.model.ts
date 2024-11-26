import { sequelizeAppConnection } from "@/infra/config/database-config";
import { DataTypes } from "sequelize";


const DriverModel = sequelizeAppConnection.define(
  'drivers',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    vehicle: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.STRING
    },
    tax: {
      type: DataTypes.FLOAT
    },
    minKm: {
      type: DataTypes.DOUBLE
    }
  }
)


export { DriverModel };
