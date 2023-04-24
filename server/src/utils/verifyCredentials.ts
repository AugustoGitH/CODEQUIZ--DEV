import jwt from "jsonwebtoken"
import { ITokenPayload } from "../interfaces/IJWTUser"

function verifyCredentials(token: string, secret: string){
  if(!token) return { isUser: false, idUser: null } 
  try{
    const { idUser } = jwt.verify(token, secret) as ITokenPayload
    return { isUser: true, idUser }
  }catch(error){
    return { isUser: false, idUser: null }
  }
}

export default verifyCredentials