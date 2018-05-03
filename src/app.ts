import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import path from "path";
dotenv.config();

// routers
import HomeRouter from "./routes/api";

/**
 * @class App
 * @description instance of express() to setup API
 */
export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private routes(): void {
    // routing
    this.app.use("/api", HomeRouter);
    const handleUnexpectedError = (err: Error, req: Request, res: Response, next: Function) => {
      res.status(500).json({ message: "Unexpected Server Error" });
    };
    this.app.use(handleUnexpectedError);
  }

  private middleware(): void {
    // express configuration
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(compression());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
}



export default new App().app;