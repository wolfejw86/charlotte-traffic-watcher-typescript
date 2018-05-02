"use strict";

import { Response, Request, NextFunction } from "express";

export class HomeController {
  public apiHome = (req: Request, res: Response) => {
    res.json({ status: 200 });
  }
  public handleUnexpectedError = (err: Error, req: Request, res: Response, next: Function) => {
    res.status(500).json({ message: "Unexpected Server Error" });
  };
}