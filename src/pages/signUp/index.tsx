import Link from 'next/link';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useRef } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';

import { api } from '../../services/api';
import { successToast } from '../../utils/toast';
import { handleErrors } from '../../functions/handleErrors';

import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { PageFooter } from '../../components/Layout/PageFooter';

import {
  BackgroundContainer,
  FieldsContainer,
  Separator,
  SignInContainer,
} from '../../styles/auth';

interface SignUpFormData {
  nome: string;
  email: string;
  senha: string;
}

const SignUp: NextPage = () => {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        nome: Yup.string().required('Nome obrigatório.'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail obrigatório.'),
        senha: Yup.string().min(6, 'Mínimo de 6 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('sign-up', data);

      successToast({
        message: 'Cadastro realizado com sucesso.',
      });

      router.push('signIn');
    } catch (err) {
      handleErrors({
        err,
        formHandles: formRef.current,
        description: 'Erro ao realizar cadastro.',
      });
    }
  }, []);

  return (
    <SignInContainer>
      <BackgroundContainer>
        <FieldsContainer>
          <h1>Crie sua Conta</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="nome" placeholder="Nome" icon={FiUser} />
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
            <Button type="submit" title="Cadastrar" styleType="green">
              Cadastrar
            </Button>
          </Form>
          <Button
            type="button"
            style={{ marginTop: '1rem' }}
            onClick={() => router.push('/')}
          >
            Voltar ao Inicio
          </Button>

          <Separator>ou</Separator>

          <Link href="/signIn">
            <Button type="button" styleType="green">
              Fazer Login
            </Button>
          </Link>
        </FieldsContainer>
      </BackgroundContainer>
      <PageFooter />
    </SignInContainer>
  );
};

export default SignUp;
