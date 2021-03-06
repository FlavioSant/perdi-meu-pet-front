import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import {
  Category,
  Publication,
  Sex,
  Situation,
  Size,
} from '../../../types/publication';

import { useAuth } from '../../../hooks/auth';
import { removeKeys } from '../../../utils/removeKeys';
import { getCoords } from '../../../functions/getCoords';
import { getAPIClient } from '../../../services/apiClient';
import { errorToast, warnToast } from '../../../utils/toast';
import { handleErrors } from '../../../functions/handleErrors';

import { PublicationsMap } from '../../Map';
import { PageHeader } from '../../Layout/PageHeader';
import { SearchPublicationDropdown } from '../../Utilities/SearchPublicationDropdown';

import { Aside, HomeViewContainer, MainContent, Register } from './styles';

interface SubmitData {
  categoria: Category;
  porte: Size;
  sexo?: Sex;
  situacao: Situation;
}

export const HomeView: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [searchedPublications, setSearchedPublications] = useState<
    Publication[]
  >([]);

  const getPublications = useCallback(async () => {
    try {
      const { latitude, longitude } = await getCoords();

      const { data } = await getAPIClient().post<Publication[]>('search', {
        latitude,
        longitude,
      });

      setPublications(data);
      setSearchedPublications(data);
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        warnToast({
          message: 'Não foi possível obter a localização.',
          options: { position: 'top-right' },
        });
        return;
      }

      errorToast({
        message: 'Erro ao buscar publicações.',
        options: { position: 'top-right' },
      });

      console.error({ err });
    }
  }, []);

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

        const { data } = await getAPIClient().post<Publication[]>(
          'search-filter',
          {
            latitude,
            longitude,
            ...parsedData,
          },
        );

        setSearchedPublications(data);
      } catch (err) {
        handleErrors({
          err,
          formHandles: formRef,
          description: 'Erro ao buscar publicações.',
        });
      }
    },
    [],
  );

  return (
    <HomeViewContainer>
      <Aside>
        <img src="/logo.svg" alt="Perdi Meu Pet" title="Perdi Meu Pet" />
        <h1>Clique em uma publicação no mapa</h1>
        <p>Ajude nossos amiguinhos perdidos e desamparados.</p>
      </Aside>

      <PageHeader />

      <MainContent>
        {isAuthenticated ? (
          <SearchPublicationDropdown
            onSubmit={(formData, formRef) => handleSubmit(formData, formRef)}
            onReset={() => setSearchedPublications(publications)}
          />
        ) : (
          <Register>
            <Link href="/signUp">
              <a>Cadastre-se</a>
            </Link>{' '}
            para gerenciar publicações.
          </Register>
        )}

        <PublicationsMap
          center={{ lat: -22.3145293, lng: -49.0659743 }}
          publications={searchedPublications}
          hasPopup
        />
      </MainContent>
    </HomeViewContainer>
  );
};
