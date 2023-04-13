import axios, { AxiosResponse } from 'axios'

import urlsAPI from '../urls'

interface IResVerfiyUser {
  data: {
    user: {
      isLogged: boolean
      name?: string
      email?: string
    }
  }
}

const urlsVerifyToken = urlsAPI.public.verifyToken.routes

const responseVerifyToken = ({ data }: IResVerfiyUser) => {
  return { data }
}

const verifyToken = {
  async user() {
    try {
      const { data }: AxiosResponse = await axios.get(urlsVerifyToken.user)
      return responseVerifyToken({
        data: {
          user: {
            ...(data?.data?.user || {}),
            isLogged: data?.data?.user.isLogged || false,
          },
        },
      })
    } catch (_error) {
      return responseVerifyToken({
        data: {
          user: {
            isLogged: false,
          },
        },
      })
    }
  },
}

export default verifyToken
