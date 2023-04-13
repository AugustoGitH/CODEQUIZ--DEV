import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { ITokenPayload } from '../../interfaces/IJWTUser'

interface IResVerfiyUser {
  message: string
  data: {
    status: number
    user: {
      isLogged: boolean
      name?: string
      email?: string
    }
  }
}

const resVerifyUser = ({ message, data }: IResVerfiyUser) => {
  return { message, data }
}

export default {
  async user(req: Request, res: Response) {
    try {
      const token = req.cookies[process.env.NAME_TOKEN_AUTORIZATION || '']
      if (!token)
        return res.send(
          resVerifyUser({
            message: 'O token de autorização não foi encontrado!',
            data: { status: 404, user: { isLogged: false } },
          })
        )

      const { name, email } = jwt.verify(
        token,
        process.env.TOKEN_SECRET || ''
      ) as ITokenPayload

      return res.send(
        resVerifyUser({
          message: `O token de autorização foi verificado. 
        Usuário verificado: ${name}`,
          data: { status: 200, user: { isLogged: true, name, email } },
        })
      )
    } catch (error) {
      return res.send(
        resVerifyUser({
          message: 'Falha ao verificar o token de autorização',
          data: { status: 401, user: { isLogged: false } },
        })
      )
    }
  },
}
