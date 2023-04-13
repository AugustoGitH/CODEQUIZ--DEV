/* eslint-disable max-len */
import * as yup from 'yup'

const authSchemas = {
  login: yup.object().shape({
    email: yup
      .string()
      .required("O campo 'email' é obrigatório!")
      .email('Email inválido!'),
    password: yup
      .string()
      .required("O campo 'senha' é obrigatório!")
      .test('ok', 'Senha inválida.', (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/.test(value)
      ),
  }),
  register: yup.object().shape({
    name: yup.string().required("O campo 'apelido' é obrigatório!"),
    email: yup
      .string()
      .required("O campo 'email' é obrigatório!")
      .email('Email inválido!'),
    password: yup
      .string()
      .required("O campo 'senha' é obrigatório!")
      .test(
        'ok',
        'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um dígito.',
        (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/.test(value)
      ),
    verify: yup
      .boolean()
      .required('É preciso fazer os comandos de verificação')
      .test(
        'ok',
        'É preciso que digite os comandos corretos seguindo sua lógica de programação!',
        (value) => value
      ),
  }),
}

export default authSchemas
