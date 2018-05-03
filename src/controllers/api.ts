"use strict";

import { Response, Request, NextFunction } from "express";
import TrafficService from "../services/TrafficService";

/**
 * @class HomeController
 * @description basic home controller to direct basic functionality of API
 */
export class HomeController {
  public apiHome = (req: Request, res: Response, next: Function): void => {
    res.json({
      status: 200,
      serviceName: "Charlotte Traffic Watcher",
      routes: [{
        path: "/api",
        data: "Home Route that describes the API Services",
      }, {
        path: "/api/current",
        data: "Gets the current Traffic Incident Data for Charlotte-Mecklenburg"
      }]
    });
  }

  public currentIncidents = async (req: Request, res: Response, next: Function): Promise<void> => {
    try {
      const currentIncidents = await TrafficService.getCurrentIncidents();
      res.status(200).json({ currentIncidents });
    } catch (error) {
      next(error);
    }
  }
}