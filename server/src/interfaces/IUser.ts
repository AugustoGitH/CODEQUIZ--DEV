export interface IUser {
  name: string
  email: string
  password: string,
  profilePicture: string
}

export interface IUserSentToClient{
  profilePicture: string,
  name: string
}

export interface IUserSentToSelf{
  name: string
  email: string
  profilePicture: string
}