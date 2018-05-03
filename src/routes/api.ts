import { Router, Request, Response, NextFunction } from "express";
import { HomeController } from "../controllers/api";

/**
 * @class HomeRouter
 * @description home router instance of express.Router() to manage scaling of routing for API
 */
export class HomeRouter {
  public router: Router;
  home: HomeController;
  constructor() {
    this.router = Router();
    this.home = new HomeController();
    this.init();
  }

  private init(): void {
    this.router.get("/",  this.home.apiHome);
    this.router.get("/current", this.home.currentIncidents);
  }

}
export default new HomeRouter().router;