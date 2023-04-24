import { NextFunction, Router, Request, Response } from "express";
import { TRoute } from "../../app/routers/public/types";

export interface IParamsCreateRouters{
  router: Router,
  middleware?: (req: Request, res: Response, next: NextFunction)=> void,
  routers: TRoute[],
}
