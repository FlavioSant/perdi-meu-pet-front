import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useCallback, useRef } from 'react';

import { FiLock, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { handleErrors } from '../../utils/handleErrors';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { PageFooter } from '../../components/PageFooter';

import {
  BackgroundContainer,
  FieldsContainer,
  Separator,
  SignInContainer,
} from '../../styles/auth';
import { api } from '../../services/api';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: NextPage = () => {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('E-mail inválido.')
          .required('E-mail obrigatório.'),
        senha: Yup.string().min(6, 'No mínimo 6 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('sign-in', data);

      router.push('/');
    } catch (err) {
      handleErrors({
        err,
        formHandles: formRef.current,
        description: 'Erro ao fazer login.',
      });
    }
  }, []);

  return (
    <SignInContainer>
      <BackgroundContainer>
        <FieldsContainer>
          <h1>Login</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              placeholder="E-mail"
              icon={FiMail}
              type="email"
            />
            <Input
              name="senha"
              placeholder="Senha"
              icon={FiLock}
              type="password"
            />
            <Button type="submit" styleType="green" title="Acessar">
              Acessar
            </Button>
          </Form>

          <Separator>ou</Separator>

          <Link href="/signUp">
            <Button type="button">Cadastre-se</Button>
          </Link>
        </FieldsContainer>
      </BackgroundContainer>
      <PageFooter />
    </SignInContainer>
  );
};

export default SignIn;
