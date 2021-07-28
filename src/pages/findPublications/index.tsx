import { NextPage } from 'next';
import { useCallback, useRef, useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Publication } from '../../@types/publication';

import { getAPIClient } from '../../services/apiClient';
import { handleErrors } from '../../utils/handleErrors';
import { warnToast } from '../../utils/toast';
import { getCoords } from '../../utils/getCoords';
import { parseFindPublications } from '../../utils/parseNewPublication';

import { PageLayout } from '../../components/PageLayout';
import { PageContainer } from '../../components/PageContainer';
import { PageTitle } from '../../components/PageTitle';
import { ImageRadioButton } from '../../components/ImageRadioButton';
import { FlexItems } from '../../components/FlexItems';
import { Select } from '../../components/Select';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { NoPublication } from '../../components/NoPublication';
import { MyPublicationCard } from '../../components/PublicationCard';

export interface FindPublicationData {
  categoria: 'cachorro' | 'gato' | 'outros';
  cor: string;
  nome?: string;
  porte: 'pequeno' | 'medio' | 'grande';
  sexo?: 'femea' | 'macho' | 'outros';
  situacao: 'desaparecido' | 'encontrado' | 'adocao';
}

const FindPublications: NextPage = () => {
  const formRef = useRef<FormHandles>(null);
  const [publications, setPublications] = useState<Publication[]>([]);

  const handleSubmit = useCallback(async (formData: FindPublicationData) => {
    try {
      if (!formData.situacao) {
        warnToast({
          message: 'Informe a situação para buscar publicações.',
        });
        return;
      }

      const schema = Yup.object().shape({
        situacao: Yup.string().required(),
        categoria: Yup.string().required(),
        porte: Yup.string().required(),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      const { latitude: lat, longitude: lng } = await getCoords();

      const parsedData = parseFindPublications(formData, {
        lat,
        lng,
      });

      const { data } = await getAPIClient().post('search-filter', parsedData);

      setPublications(data);
    } catch (err) {
      handleErrors({
        description: 'Não foi possívelbuscar publicaçãos.',
        formHandles: formRef.current,
        err,
      });
    }
  }, []);

  return (
    <PageLayout>
      <PageTitle title="Buscar Publicação" />
      <PageContainer description="Dados do Pet">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <p>Informe a situação do pet abaixo:</p>
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
              name="sexo"
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
                {
                  label: 'Outros',
                  value: 'outros',
                },
              ]}
            />
            <Input name="cor" label="Cor" />
          </FlexItems>

          <FlexItems hasMargin>
            <Input name="nome" label="Nome do Pet" />
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
        <section style={{ marginTop: '2.5rem' }}>
          <PageTitle title="Publicações Encontradas" />

          {publications.map((publication, index) => (
            <MyPublicationCard
              key={index}
              data={{
                categoria: publication.categoria,
                createdAt: new Date(publication.createdAt).toLocaleString(),
                porte: publication.porte,
                situacao: publication.situacao,
                anexo: publication.anexos[0] || '',
                nome: publication.nome || '',
                sexo: publication.sexo,
              }}
            />
          ))}
        </section>
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
