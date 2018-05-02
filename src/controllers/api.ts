"use strict";

import { Response, Request, NextFunction } from "express";
import TrafficService from "../services/TrafficService";

export class HomeController {
  public apiHome = (req: Request, res: Response, next: Function) => {
    res.json({ status: 200 });
  }

  public currentIncidents = async (req: Request, res: Response, next: Function) => {
    try {
      const currentIncidents = await TrafficService.getCurrentIncidents();
      res.status(200).json({ currentIncidents });
    } catch (error) {
      next(error);
    }
  }
}