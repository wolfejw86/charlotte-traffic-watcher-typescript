import dotenv from "dotenv";
import express, { Request, Response } from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import path from "path";
dotenv.config();

// routers
import HomeRouter from "./routes/api";

// Create express server
const app = express();

// express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routing
app.use("/api", HomeRouter);

export const handleUnexpectedError = (err: Error, req: Request, res: Response, next: Function) => {
  res.status(500).json({ message: "Unexpected Server Error" });
};

app.use(handleUnexpectedError);

export default app;