import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { cors } from "./middlewares/cors";
import server from "./socket/index";

export const app: express.Application = express();

function main() {
  dotenv.config();

  // Settings
  app.set("port", <string>process.env.APP_PORT || 3000);
  app.set("view engine", "html");
  app.use(cors());

  // Middleware
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.set('trust proxy', true);

  server.listen(app.get("port"));

}

main();
