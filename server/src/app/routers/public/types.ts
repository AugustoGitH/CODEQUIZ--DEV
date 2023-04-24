import { Request, Response, NextFunction } from "express"

export interface TRoute {
  path: string,
  controller: (req?: Request, res?: Response, next?: NextFunction)=> void,
  method: "get" | "post" | "delete" | "put"
}
