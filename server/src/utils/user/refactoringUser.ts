import { Document } from "mongoose"
import { IUser, IUserSentToSelf } from "../../interfaces/IUser"





export const refactoringUser = {
  props: (user: IUser & Document): IUserSentToSelf=>({
    email: user.email,
    name: user.name,
    profilePicture: user.profilePicture
  }),
  find(quiz: IUser & Document ){
    return this.props(quiz)
  }
}