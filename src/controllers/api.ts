"use strict";

import { Response, Request, NextFunction } from "express";

export class HomeController {
  public apiHome = (req: Request, res: Response, next: Function) => {
    res.json({ status: 200 });
  }
}