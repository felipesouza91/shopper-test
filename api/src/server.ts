import 'dotenv/config';
import 'express-async-errors';
import { sequelizeAppConnection } from './infra/config/database-config';
import { app } from './infra/http/app';

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await sequelizeAppConnection.sync()
    app.listen(port, async () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start()
