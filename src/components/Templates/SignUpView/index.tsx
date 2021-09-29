import Router from 'next/router';
import { useCallback, useRef } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { api } from '../../../services/api';
import { successToast } from '../../../utils/toast';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import { handleErrors } from '../../../functions/handleErrors';

import { Input } from '../../Forms/Input';
import { Button } from '../../Forms/Button';
import { PageFooter } from '../../Layout/PageFooter';
import { ActionLink } from '../../Utilities/ActionLink';

import {
  BackgroundContainer,
  FieldsContainer,
  Separator,
  SignInContainer,
} from '../../../styles/auth';

interface SignUpFormData {
  nome: string;
  email: string;
  senha: string;
}

export const SignUpView: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (formData: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        nome: Yup.string().required('Nome obrigatório.'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail obrigatório.'),
        senha: Yup.string().min(6, 'Mínimo de 6 caracteres'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await api.post('sign-up', formData);

      successToast({
        message: 'Cadastro realizado com sucesso.',
      });

      Router.push('signIn');
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
            <Button
              type="submit"
              title="Cadastrar"
              background="green"
              marginBottom="1rem"
            >
              Cadastrar
            </Button>
          </Form>

          <ActionLink href="/" label="Voltar ao Início" />

          <Separator>ou</Separator>

          <ActionLink href="/signIn" label="Fazer Login" background="green" />
        </FieldsContainer>
      </BackgroundContainer>
      <PageFooter />
    </SignInContainer>
  );
};
