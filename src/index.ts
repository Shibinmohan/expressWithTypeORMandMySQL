/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import {notFoundHandler} from "./middleware/notFound.middleware";
import {User} from "./entity/User";
import { createConnection } from 'typeorm';
import { customerRouter } from "./routes/customer";
import bodyparser from "body-parser"
dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: 'testuser',
  password: 'test123',
  database: 'nodetest',
  entities: [
     User
  ],
  synchronize: true,
  logging: false,
}).then(async connection => {
  console.log('connection created');
}).catch(error => console.log(error));

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use("/items", itemsRouter);
app.use("/customer", customerRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 *  App Routing
 */
app.get("/", (req, res) => {
  res.json({ message: "Testing.." });
});

/**
 * Server Activation
 */
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/**
 * Webpack HMR Activation
 */
type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
