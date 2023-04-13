/* eslint-disable max-len */
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../../db/models/User'
import { schemaLogin, schemaRegister } from '../../db/schemas/Authentication'

export default {
  async login(req: Request, res: Response) {
    interface IRequestBody {
      email: string
      password: string
    }
    const { email, password }: IRequestBody = req.body

    if (!email || !password)
      return res.status(400).send({
        message: 'Email ou senha não encontrados!',
      })
    const { error } = schemaLogin({ email, password })
    if (error)
      return res.status(400).send({
        message: error.message,
      })

    try {
      const userSearch = await User.findOne({ email })
      const passwordCryptoMath = userSearch
        ? bcrypt.compare(password, userSearch.password)
        : null

      if (!userSearch || !passwordCryptoMath)
        return res.status(401).send({
          message: 'Email ou senha incorretos!',
        })

      const tokenJWT = jwt.sign(
        { email, name: userSearch.name, idUser: userSearch._id },
        process.env?.TOKEN_SECRET || ''
      )

      res
        .status(200)
        .cookie(
          process.env?.NAME_TOKEN_AUTORIZATION || 'tokenAuthorization',
          tokenJWT,
          {
            secure: true,
            httpOnly: true,
          }
        )
        .send({
          message: 'O processo de login foi realizado com sucesso!',
        })
    } catch (e) {
      console.log(e)
      res.status(500).send({
        message:
          'Ocorreu um erro inesperado internamente no servidor. Verifique o console da aplicação.',
      })
    }
  },
  async register(req: Request, res: Response) {
    interface IRequestBody {
      name: string
      email: string
      password: string
    }

    const { name, email, password }: IRequestBody = req.body

    if (!name || !email || !password)
      return res.status(400).send({
        message:
          'Dados de entrada inválidos! Verifique se nenhum dos valores passado é indefinido ou nulo.',
      })

    const { error } = schemaRegister({ email, password, name })
    if (error)
      return res.status(400).send({
        message: error.message,
      })

    try {
      const userSearch = await User.findOne({ email })

      if (userSearch)
        return res.status(409).send({
          message: 'Esse email já está registrado em nosso sistema!',
        })

      const passwordCrypto = bcrypt.hashSync(password, 10)

      const newUser = await new User({
        name,
        email,
        password: passwordCrypto,
      }).save()

      res.status(201).send({
        message: `Bem vindo ${newUser.name}! Seu registro foi realizado com sucesso!`,
      })
    } catch (e) {
      console.log(`Erro interno do servidor: ${e}`)
      res.status(500).send({
        message:
          'Ocorreu um erro inesperado internamente no servidor. Verifique o console da aplicação.',
      })
    }
  },
  async logout(_req: Request, res: Response) {
    try {
      res.clearCookie(process.env.NAME_TOKEN_AUTORIZATION || '')
      res.status(200).send({
        message: 'O logout foi realizado com sucesso!',
      })
    } catch (e) {
      console.log(`Erro interno do servidor: ${e}`)
      res.status(500).send({
        message:
          'Houve um erro interno no servidor ao fazer logout! Tente novamente ou entre em contato com o desenvolvedor.',
      })
    }
  },
}
