import { Router, Request, Response, NextFunction } from "express";
import { HomeController } from "../controllers/api";

export class HomeRouter {
  public router: Router;
  home: HomeController;
  constructor() {
    this.router = Router();
    this.home = new HomeController();
    this.init();
  }

  private init() {
    this.router.get("/",  this.home.apiHome);
    this.router.get("/current", this.home.currentIncidents);
    return this;
  }

}
export default new HomeRouter().router;