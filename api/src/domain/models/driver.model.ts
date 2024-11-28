import { sequelizeAppConnection } from "@/infra/config/database-config";
import { DataTypes } from "sequelize";
import { RideModel } from "./ride.model";


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

DriverModel.hasMany(RideModel, {
  foreignKey: 'driver_id',
  as: "driver_id"
})

RideModel.belongsTo(DriverModel, {
  foreignKey: 'driver_id',
  
})  


export { DriverModel };
