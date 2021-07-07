import { NextPage } from 'next';
import { useCallback, useRef } from 'react';

import { FiCheck, FiImage, FiX } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { handleErrors } from '../../utils/handleErrors';

import { PageContainer } from '../../components/PageContainer';
import { PageLayout } from '../../components/PageLayout';
import { PageTitle } from '../../components/PageTitle';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { FlexItems } from '../../components/FlexItems';

import { MapContainer, FormButtons } from './styles';

const NewPublication: NextPage = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: Record<string, any>) => {
    try {
      console.log(data);

      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        categoria: Yup.object()
          .shape({
            label: Yup.string(),
            value: Yup.string(),
          })
          .nullable()
          .required(),
        porte: Yup.object()
          .shape({
            label: Yup.string(),
            value: Yup.string(),
          })
          .nullable()
          .required(),
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
          <FlexItems>
            <Select
              name="categoria"
              label="Categoria"
              options={[
                {
                  label: 'Cachorro',
                  value: 'cachorro',
                },
                {
                  label: 'Gato',
                  value: 'gato',
                },
                {
                  label: 'Outros',
                  value: 'outros',
                },
              ]}
            />
            <Select
              name="porte"
              label="Porte"
              options={[
                {
                  label: 'Pequeno',
                  value: 'pequeno',
                },
                {
                  label: 'Médio',
                  value: 'medio',
                },
                {
                  label: 'Grande',
                  value: 'grande',
                },
              ]}
            />
            <Select
              name="sexoAnimal"
              label="Sexo do Animal"
              options={[
                {
                  label: 'Fêmea',
                  value: 'femea',
                },
                {
                  label: 'Macho',
                  value: 'macho',
                },
              ]}
            />
            <Input name="cor" label="Cor" />
          </FlexItems>

          <FlexItems>
            <Input name="nomePet" label="Nome do Pet" />
            <Button type="button">
              <FiImage size={22} />
              Adicione Imagens do Pet
            </Button>
          </FlexItems>

          <FormButtons>
            <Button type="button" styleType="red">
              <FiX size={22} />
              Cancelar
            </Button>
            <Button type="submit" styleType="green">
              <FiCheck size={22} />
              Finalizar Cadastro
            </Button>
          </FormButtons>
        </Form>
      </PageContainer>
    </PageLayout>
  );
};

export default NewPublication;
