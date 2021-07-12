import { NextPage } from 'next';
import { useCallback, useRef } from 'react';

import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { PageFooter } from '../../components/PageFooter';

import {
  BackgroundContainer,
  FieldsContainer,
  SignInContainer,
} from '../../styles/auth';

const SignUp: NextPage = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <SignInContainer>
      <BackgroundContainer>
        <FieldsContainer>
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
            <Button type="submit" title="Cadastrar">
              Cadastrar
            </Button>
          </Form>
        </FieldsContainer>
      </BackgroundContainer>
      <PageFooter />
    </SignInContainer>
  );
};

export default SignUp;
