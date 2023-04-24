import { Response, Request, NextFunction } from "express";
import { TRoute } from "../../app/routers/public/types";
import { IParamsCreateRouters } from "./types";


const createRouters = ({ router, middleware, routers }: IParamsCreateRouters): void => {
  const midCond = middleware ?? 
    ((req: Request, res: Response, next: NextFunction) => { next() });
  
  routers.forEach((route: TRoute) => {
    router[route.method](route.path, midCond, route.controller);
  });
};

export default createRouters;