import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

function verifyCredentialsRouters(req: Request, res: Response, next: NextFunction){
  try {
    const token = req.cookies[process.env.NAME_TOKEN_AUTORIZATION || '']
    if (!token) return res.status(401).send({
        message: 'O token de autorização não foi encontrado!',
    })
    jwt.verify(token, process.env.TOKEN_SECRET || '')
    return next()
  } catch (error) {
    res.status(401).send({
      message: 'Falha ao verificar o token de autorização!',
    })
  }
} 


export default verifyCredentialsRouters