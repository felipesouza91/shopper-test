import { sequelizeAppConnection } from "@/infra/config/database-config";
import { DataTypes } from "sequelize";


const RideModel = sequelizeAppConnection.define(
  'rides',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.STRING
    },
    origin: {
      type: DataTypes.STRING
    },
    destination: {
      type: DataTypes.STRING
    },
    distance: {
      type: DataTypes.INTEGER
    },
    duration: {
      type: DataTypes.STRING
    },
    driver_id: {
      type: DataTypes.INTEGER
    },
    value: {
      type: DataTypes.DOUBLE
    }
  }
)


export { RideModel };
