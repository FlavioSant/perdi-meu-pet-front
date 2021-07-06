import { NextPage } from 'next';
import { useCallback, useRef } from 'react';

import { FiCheck } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { handleErrors } from '../../utils/handleErrors';

import { PageContainer } from '../../components/PageContainer';
import { PageLayout } from '../../components/PageLayout';
import { PageTitle } from '../../components/PageTitle';
import { Input } from '../../components/Input';

import { MapContainer } from './styles';

const NewPublication: NextPage = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: Record<string, any>) => {
    try {
      console.log(data);

      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        petName: Yup.string().required('Nome do pet obrigatório.'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      handleErrors({ err, formHandles: formRef.current });
    }
  }, []);

  return (
    <PageLayout>
      <PageTitle title="Crie sua Publicação" />
      <PageContainer description="Dados do Pet">
        <MapContainer>
          <div />
          <footer>Clique no mapa para adicionar a localização</footer>
        </MapContainer>

        <p>Informe a situação do pet abaixo:</p>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="color" label="Cor" />
          <Input name="petName" label="Nome do Pet" />
          <button type="submit">
            <FiCheck size={22} />
            Finalizar Cadastro
          </button>
        </Form>
      </PageContainer>
    </PageLayout>
  );
};

export default NewPublication;
