import { GetServerSideProps, NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';

import { FormHandles } from '@unform/core';
import { parseCookies } from 'nookies';
import * as Yup from 'yup';

import {
  Category,
  Publication,
  Sex,
  Situation,
  Size,
} from '../@types/publication';
import { api } from '../services/api';
import { getAPIClient } from '../services/apiClient';
import { getCoords } from '../utils/getCoords';
import { errorToast, warnToast } from '../utils/toast';
import { handleErrors } from '../utils/handleErrors';
import { removeKeys } from '../utils/removeKeys';

import { PublicationsMap } from '../components/Map';
import { PageHeader } from '../components/PageHeader';
import { SearchPublicationDropdown } from '../components/SearchPublicationDropdown';

import { Aside, Container, MainContent } from '../styles/Home';

interface SubmitData {
  categoria: Category;
  porte: Size;
  sexo?: Sex;
  situacao: Situation;
}

const Home: NextPage = () => {
  const [isReset, setIsReset] = useState(false);
  const [publications, setPublications] = useState<Publication[]>([]);

  const getPublications = useCallback(async () => {
    try {
      const { latitude, longitude } = await getCoords();

      const { data } = await api.post('search', { latitude, longitude });

      setPublications(data);
      setIsReset(false);
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        warnToast({
          message: 'Não foi possível obter a localização.',
          options: { position: 'bottom-center' },
        });
        return;
      }

      errorToast({
        message: 'Erro ao buscar publcações.',
        options: { position: 'bottom-center' },
      });

      console.error({ err });
    }
  }, [isReset]);

  useEffect(() => {
    getPublications();
  }, []);

  const handleSubmit = useCallback(
    async (formData: SubmitData, formRef: FormHandles) => {
      try {
        formRef?.setErrors({});

        const schema = Yup.object().shape({
          situacao: Yup.string().required(),
          categoria: Yup.string().required(),
          porte: Yup.string().required(),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        const { latitude, longitude } = await getCoords();

        let parsedData = { ...formData };

        if (!parsedData.sexo) {
          parsedData = removeKeys(formData, ['sexo']);
        }

        const { data } = await getAPIClient().post('search-filter', {
          latitude,
          longitude,
          ...parsedData,
        });

        setPublications(data);
        setIsReset(true);
      } catch (err) {
        handleErrors({
          err,
          formHandles: formRef,
          description: 'Erro ao buscar publicações.',
        });
      }
    },
    [isReset],
  );

  return (
    <Container>
      <Aside>
        <img src="/logo.svg" alt="Perdi Meu Pet" title="Perdi Meu Pet" />
        <h1>Clique em uma publicação no mapa</h1>
        <p>Ajude nossos amiguinhos perdidos e desamparados.</p>
      </Aside>

      <PageHeader />

      <MainContent>
        <SearchPublicationDropdown
          isReset={isReset}
          onSubmit={(formData, formRef) => handleSubmit(formData, formRef)}
          onReset={getPublications}
        />
        <PublicationsMap
          center={{ lat: -22.3145293, lng: -49.0659743 }}
          publications={publications}
          hasPopup
        />
      </MainContent>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['perdi-meu-pet']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/signIn',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
