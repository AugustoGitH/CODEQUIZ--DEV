import { type Request, type Response } from 'express'
import jwt from "jsonwebtoken"


interface IResVerfiyUser {
  message: string
  isAuthenticated: boolean
}

const resVerifyUser = ({ message, isAuthenticated }: IResVerfiyUser) => {
  return { message, isAuthenticated }
}

export default {
  async user(req: Request, res: Response) {
    try {
      const token = req.cookies[process.env.NAME_TOKEN_AUTORIZATION || '']
      if (!token)
        return res.send(
          resVerifyUser({
            message: 'O token de autorização não foi encontrado!',
            isAuthenticated: false
          })
        )
        
        jwt.verify(token, process.env.TOKEN_SECRET || "")

      return res.send(
        resVerifyUser({
          message: `O token de autorização foi verificado. `,
          isAuthenticated: true,
        })
      )
    } catch (error) {
      console.log(error)
      return res.send(
        resVerifyUser({
          message: 'Falha ao verificar o token de autorização',
          isAuthenticated: false
        })
      )
    }
  },
}
