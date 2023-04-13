/* eslint-disable max-len */
import Joi from '@hapi/joi'

const regexValidatePassword =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

interface ILogin {
  email: string
  password: string
}

interface IRegister {
  name: string
  email: string
  password: string
}

const schemaLogin = (data: ILogin) => {
  const schema = Joi.object({
    email: Joi.string().email().message('Email inválido!').required(),
    password: Joi.string()
      .pattern(regexValidatePassword)
      // eslint-disable-next-line max-len
      .message(
        'Senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.'
      )
      .required(),
  })
  return schema.validate(data)
}

const schemaRegister = (data: IRegister) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(20).required(),
    email: Joi.string().email().message('Email inválido!').required(),
    password: Joi.string()
      .pattern(regexValidatePassword)
      // eslint-disable-next-line max-len
      .message(
        'Senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.'
      )
      .required(),
  })
  return schema.validate(data)
}

export { schemaLogin, schemaRegister }
