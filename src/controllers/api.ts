"use strict";

import { Response, Request, NextFunction } from "express";

export let getApi = (req: Request, res: Response) => {
  res.json({ status: 200 });
};

export let handleUnexpectedError = (err: Error, req: Request, res: Response, next: Function) => {
  res.status(500).json({ message: "Unexpected Server Error" });
};