import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler, FieldValues } from 'react-hook-form';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Input from '../../components/Input';
import useFetchVerifyCredential from '../../queries/verifyCredential';
import authenticationSchemas from '../../schemas/authentication';
import authenticationService from '../../services/public/Authentication';
import BlockCodeForm from './components/BlockCodeForm';
import { RegisterScreenStyled } from './styles';


function FormRegister() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(authenticationSchemas.register) });

  const register: SubmitHandler<FieldValues> = (data) => {
    const { email, name, password } = data
    authenticationService.register({ email, name, password }).then(response => {
      const { status, message } = response;
      alert(message);
      if (status) return navigate('/auth/login');
    });
  }

  return (
    <form onSubmit={handleSubmit(register)}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange } }) => (
          <Input
            onChange={onChange}
            label="apelido"
            error={!!errors.name}
            helperText={errors.name?.message?.toString()}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange } }) => (
          <Input
            onChange={onChange}
            label="email"
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange } }) => (
          <Input
            onChange={onChange}
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message?.toString()}
            label="senha"
          />
        )}
      />
      <Controller
        control={control}
        name="verify"
        render={({ field: { onChange } }) => (
          <BlockCodeForm
            onChange={onChange}
            helperText={errors.verify?.message?.toString()}
          />
        )}
      />
      <div className="button-submit-container">
        <button type="submit">Bora lá?</button>
        <Link to="/auth/login">Já possui uma conta?</Link>
      </div>
    </form>
  );
}

function FormLogin() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(authenticationSchemas.login) });
  const navigate = useNavigate();

  const login: SubmitHandler<FieldValues> = (data) => {
    const { email, password } = data
    authenticationService.login({ email, password }).then(response => {
      const { message, status } = response;
      alert(message);
      if (status) return navigate('/painel');
    });
  }

  return (
    <form onSubmit={handleSubmit(login)}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange } }) => (
          <Input
            onChange={onChange}
            label="email"
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange } }) => (
          <Input
            onChange={onChange}
            type="password"
            label="senha"
            error={!!errors.password}
            helperText={errors.password?.message?.toString()}
          />
        )}
      />
      <div className="button-submit-container">
        <button>Entrar</button>
        <Link to="/auth/register">Não possui um conta?</Link>
      </div>
    </form>
  );
}

export default function RegisterScreen() {
  const { section } = useParams();
  const { data: isAuthentited } = useFetchVerifyCredential()

  return !isAuthentited ? (
    <>
      <Header position="fixed" />
      <Container>
        <RegisterScreenStyled>
          <div className="card">
            {section === 'register' ? <FormRegister /> : <FormLogin />}
          </div>
        </RegisterScreenStyled>
      </Container>
    </>
  ) : (
    isAuthentited && <Navigate to="/painel" />
  );
}
