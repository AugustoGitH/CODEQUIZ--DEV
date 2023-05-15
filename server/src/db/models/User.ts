import { model, Schema, Document } from 'mongoose'

import { IUser } from '../../interfaces/IUser'

import settingsUser from "../../settings/user"

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: settingsUser.profileDefault },
  achievements: { type: Array, default: [] }
})

export default model<IUser & Document>('User', UserSchema)
