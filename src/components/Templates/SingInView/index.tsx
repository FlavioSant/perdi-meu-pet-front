import { useCallback, useRef } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLock, FiMail } from 'react-icons/fi';

import { useAuth } from '../../../hooks/auth';
import { handleErrors } from '../../../functions/handleErrors';

import { Input } from '../../Forms/Input';
import { Button } from '../../Forms/Button';
import { PageFooter } from '../../Layout/PageFooter';

import {
  BackgroundContainer,
  FieldsContainer,
  Separator,
  SignInContainer,
} from '../../../styles/auth';
import { ActionLink } from '../../Utilities/ActionLink';

interface SignInFormData {
  email: string;
  senha: string;
}

export const SingInView: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const handleSubmit = useCallback(async (formData: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('E-mail inválido.')
          .required('E-mail obrigatório.'),
        senha: Yup.string().min(6, 'No mínimo 6 caracteres'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await signIn(formData);
    } catch (err) {
      handleErrors({
        err,
        formHandles: formRef.current,
        description: 'Não foi possível fazer login.',
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
            <Button type="submit" title="Acessar">
              Acessar
            </Button>
          </Form>

          <Separator>ou</Separator>

          <ActionLink href="/signUp" label="Cadastre-se" background="green" />
        </FieldsContainer>
      </BackgroundContainer>
      <PageFooter />
    </SignInContainer>
  );
};
