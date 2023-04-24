import { Request, Response } from "express";
import settingUser from "../../../settings/user"
import User from "../../../db/models/User";
import jwt from "jsonwebtoken"
import { ITokenPayload } from "../../../interfaces/IJWTUser";
import { IUser } from "../../../interfaces/IUser";
import userReleasedByToken from "./utils/userReleasedByToken";
const { profilePictureOptions } = settingUser

export default {
  async getProfilePictureOptions(req: Request, res: Response){
    res.status(200).send({
      message: "As opções de imagem para perfil carregadas!",
      data: { profilePictureOptions }
    })
  },
  async changeProfilePicture(req: Request, res: Response){
    const { urlImageSelect } = req.body
    const token = req.cookies[process.env?.NAME_TOKEN_AUTORIZATION || ""]

    if(!profilePictureOptions.includes(urlImageSelect)) return res.status(404).send({
      message: "A imagem escolhida não faz parte das opções estabelecidas pelo servidor."
    })
    try{
      const tokenDecoded = jwt.verify(
        token, process.env?.TOKEN_SECRET || "") as ITokenPayload

      await User.updateOne({ _id: tokenDecoded.idUser }, {
        profilePicture: urlImageSelect
      } as IUser)

      res.status(200).send({
        message: "Imagem de perfil alterada com sucesso!"
      })
    }catch(error){
      console.log(error)
      res.status(500).send({
        message: "Ocorreu um erro interno no servidor ao tentar mudar o seu perfil."
      })
    }
  },
  async getInfosUser(req: Request, res: Response){
    const token = req.cookies[process.env?.NAME_TOKEN_AUTORIZATION || ""]
    const { user } = await userReleasedByToken(token)
    if(!user) return res.status(404).send({
      message: "Usuario não foi encontrado!"
    })
    res.status(200).send({
      message: "Dados do usuario resgatado com sucesso!",
      data: { user }
    })
  }
}