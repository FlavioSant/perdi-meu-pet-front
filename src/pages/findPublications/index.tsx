import { NextPage } from 'next';
import { useCallback, useRef, useState } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FiSearch } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import {
  Category,
  Publication,
  Sex,
  Situation,
  Size,
} from '../../types/publication';

import { auth } from '../../middleware/auth';
import { warnToast } from '../../utils/toast';
import { getCoords } from '../../functions/getCoords';
import { getAPIClient } from '../../services/apiClient';
import { handleErrors } from '../../functions/handleErrors';
import { serverSideHandler } from '../../functions/serverSideHandler';
import { parseFindPublications } from '../../functions/parsePublications';
import { radioButtonOptions, selectOptions } from '../../utils/inputsOptions';

import { Input } from '../../components/Forms/Input';
import { Select } from '../../components/Forms/Select';
import { Button } from '../../components/Forms/Button';
import { FlexItems } from '../../components/FlexItems';
import { PageTitle } from '../../components/Layout/PageTitle';
import { NoPublication } from '../../components/NoPublication';
import { PageLayout } from '../../components/Layout/PageLayout';
import { PageContainer } from '../../components/Layout/PageContainer';
import { PublicationCard } from '../../components/Cards/PublicationCard';
import { ImageRadioButton } from '../../components/Forms/ImageRadioButton';

export interface FindPublicationData {
  categoria: Category;
  cor: string;
  nome?: string;
  porte: Size;
  sexo?: Sex;
  situacao: Situation;
}

const FindPublications: NextPage = () => {
  const formRef = useRef<FormHandles>(null);
  const [publications, setPublications] = useState<Publication[]>([]);

  const handleSubmit = useCallback(async (formData: FindPublicationData) => {
    try {
      formRef.current?.setErrors({});

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
      <PageTitle title="Buscar Publicações" />
      <PageContainer description="Dados do Pet">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <p>Informe a situação do pet abaixo:</p>
          <ImageRadioButton name="situacao" options={radioButtonOptions} />

          <FlexItems>
            <Select
              name="categoria"
              label="Categoria"
              options={selectOptions.category}
            />
            <Select name="porte" label="Porte" options={selectOptions.size} />
            <Select
              name="sexo"
              label="Sexo do Animal"
              options={selectOptions.sex}
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
            <PublicationCard
              key={index}
              data={{
                publicacaoId: publication.publicacaoId,
                categoria: publication.categoria,
                createdAt: new Date(publication.createdAt).toLocaleString(),
                isResolvido: publication.isResolvido,
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

export const getServerSideProps = serverSideHandler(auth(), async () => ({
  props: {},
}));

export default FindPublications;
