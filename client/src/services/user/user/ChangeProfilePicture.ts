/* eslint-disable max-len */

import axios, { AxiosError } from 'axios'

import { routesUser } from '../../routes/user'

interface IResponseChangeProfilePicture {
  message: string
  status: boolean
}

async function changeProfilePicture(
  urlImageSelect: string
): Promise<IResponseChangeProfilePicture> {
  try {
    const { data } = await axios.post(routesUser.changeProfilePicture, {
      urlImageSelect,
    })

    return {
      message: data?.message || 'Imagem trocada com sucesso!',
      status: true,
    }
  } catch (error: unknown) {
    console.log(error)
    if (error instanceof AxiosError) {
      const { response } = error
      return {
        message:
          response?.data?.message ||
          'Erro interno do servidor ao trocar imagem de perfil.',
        status: false,
      }
    } else
      return {
        message: 'Erro interno do servidor ao trocar imagem de perfil',
        status: false,
      }
  }
}

export default changeProfilePicture
