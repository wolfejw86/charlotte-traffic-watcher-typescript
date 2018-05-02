import { Router, Request, Response, NextFunction } from "express";
import { HomeController } from "../controllers/api";

export class HomeRouter {
  router: Router;
  home: HomeController;
  constructor() {
    this.router = Router();
    this.home = new HomeController();
    this.init();
  }

  init() {
    this.router.get("/",  this.home.apiHome);
    return this;
  }

}
export default new HomeRouter().router;