import { model, Schema, Document } from 'mongoose'

import { IUser } from '../../interfaces/IUser'

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

export default model<IUser & Document>('User', UserSchema)
