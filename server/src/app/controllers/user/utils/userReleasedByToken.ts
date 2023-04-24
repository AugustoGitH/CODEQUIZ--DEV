import jwt from "jsonwebtoken"
import { ITokenPayload } from "../../../../interfaces/IJWTUser"
import User from "../../../../db/models/User"
import { refactoringUser } from "../../../../utils/user/refactoringUser"
import { IUserSentToSelf } from "../../../../interfaces/IUser"

async function userReleasedByToken(token: string):Promise<
{ user: IUserSentToSelf | null }> {
  
  if(!token) return { user: null }
  try{
    const tokenDecoded = jwt.verify(
      token, process.env?.TOKEN_SECRET || "") as ITokenPayload

    const user = await User.findById(tokenDecoded.idUser)
    
    if(!user) return { user: null }

    return {
      user: refactoringUser.find(user)
    }
  }catch(error){
    console.log(error)
    return { user: null }
  }
}

export default userReleasedByToken