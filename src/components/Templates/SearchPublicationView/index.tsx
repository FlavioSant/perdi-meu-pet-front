import { useCallback, useRef, useState } from 'react';

import { Publication } from '../../../types/publication';
import { SearchPublicationData } from '../../../types/pages/searchPublication';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import {
  radioButtonOptions,
  selectOptions,
} from '../../../utils/inputsOptions';
import { FiSearch } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { warnToast } from '../../../utils/toast';
import { getCoords } from '../../../functions/getCoords';
import { getAPIClient } from '../../../services/apiClient';
import { handleErrors } from '../../../functions/handleErrors';
import { parseFindPublications } from '../../../functions/parsePublications';

import { Input } from '../../Forms/Input';
import { Select } from '../../Forms/Select';
import { Button } from '../../Forms/Button';
import { PageTitle } from '../../Layout/PageTitle';
import { NoPublication } from '../../NoPublication';
import { PageLayout } from '../../Layout/PageLayout';
import { FlexItems } from '../../Utilities/FlexItems';
import { PageContainer } from '../../Layout/PageContainer';
import { PublicationCard } from '../../Cards/PublicationCard';
import { ImageRadioButton } from '../../Forms/ImageRadioButton';

export const SearchPublicationView: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [publications, setPublications] = useState<Publication[]>([]);

  const handleSubmit = useCallback(async (formData: SearchPublicationData) => {
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
            background="green"
            title="Buscar Publicações"
            marginTop="2rem"
            width="100%"
            style={{ padding: '1rem' }}
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
