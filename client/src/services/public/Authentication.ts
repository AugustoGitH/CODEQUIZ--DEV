import axios, { AxiosError } from 'axios'

import urlsAPI from '../urls'
import { ILogin, IRegister } from '../../interfaces/IAuthentication'

interface IResponseAuthentication {
  message: string
  status: boolean
}

const urlsAuthentication = urlsAPI.public.authentication.routes

const authentication = {
  async register(user: IRegister): Promise<IResponseAuthentication> {
    try {
      const { data } = await axios.post(urlsAuthentication.register, user)

      return {
        message: data?.message || 'Seu registro foi realizado com sucesso!',
        status: true,
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return {
          message:
            error.response?.data.message || 'Erro ao realizar o seu registro!',
          status: false,
        }
      } else
        return {
          message: 'Erro ao realizar o seu registro!',
          status: false,
        }
    }
  },
  async login(user: ILogin): Promise<IResponseAuthentication> {
    try {
      const { data } = await axios.post(urlsAuthentication.login, user)

      return {
        message: data?.message || 'Login realizado com sucesso!',
        status: true,
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return {
          message: error.response?.data.message || 'Erro ao realizar login!',
          status: false,
        }
      } else
        return {
          message: 'Erro ao realizar login!',
          status: false,
        }
    }
  },
  async logout(): Promise<IResponseAuthentication> {
    try {
      const { data } = await axios.get(urlsAuthentication.logout)

      return {
        message: data?.message || 'Logout realizado com sucesso!',
        status: true,
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error)
        return {
          message: error.response?.data.message || 'Erro ao realizar logout!',
          status: false,
        }
      } else
        return {
          message: 'Erro ao realizar logout!',
          status: false,
        }
    }
  },
}

export default authentication
