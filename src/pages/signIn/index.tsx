import { NextPage } from 'next';
import Link from 'next/link';
import { useCallback, useRef } from 'react';

import { FiLock, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { PageFooter } from '../../components/PageFooter';

import {
  BackgroundContainer,
  FieldsContainer,
  Separator,
  SignInContainer,
} from '../../styles/auth';

const SignIn: NextPage = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <SignInContainer>
      <BackgroundContainer>
        <FieldsContainer>
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
