import { NextPage } from 'next';
import { useCallback, useRef, useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { PageLayout } from '../../components/PageLayout';
import { PageContainer } from '../../components/PageContainer';
import { PageTitle } from '../../components/PageTitle';
import { ImageRadioButton } from '../../components/ImageRadioButton';
import { FlexItems } from '../../components/FlexItems';
import { Select } from '../../components/Select';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { NoPublication } from '../../components/NoPublication';

const FindPublications: NextPage = () => {
  const formRef = useRef<FormHandles>(null);
  const [publications, setPublications] = useState([]);

  const handleSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <PageLayout>
      <PageTitle title="Buscar Publicação" />
      <PageContainer description="Dados do Pet">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <ImageRadioButton
            name="situacao"
            options={[
              {
                id: 'desaparecido',
                label: 'Desaparecido',
                value: 'desaparecido',
                imageURL: '/sad-dog.svg',
              },
              {
                id: 'encontrado',
                label: 'Encontrado',
                value: 'encontrado',
                imageURL: 'happy-animals.svg',
              },
              {
                id: 'adocao',
                label: 'Adoção',
                value: 'adocao',
                imageURL: '/adoption.svg',
              },
            ]}
          />

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

          <FlexItems hasMargin>
            <Input name="nomePet" label="Nome do Pet" />
          </FlexItems>

          <Button
            type="submit"
            styleType="green"
            title="Buscar Publicações"
            style={{ padding: '1rem', marginTop: '2rem', width: '100%' }}
          >
            <FiSearch size={18} />
            Buscar Publicações
          </Button>
        </Form>
      </PageContainer>

      {publications.length > 0 ? (
        publications.map((publication, index) => (
          <div key={index}>publicação</div>
        ))
      ) : (
        <NoPublication
          title="Nenhuma publicação por aqui..."
          description="Preencha os campos acima e clique em buscar publicações!"
        />
      )}
    </PageLayout>
  );
};

export default FindPublications;
