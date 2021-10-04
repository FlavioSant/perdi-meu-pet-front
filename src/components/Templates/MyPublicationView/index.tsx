import Router from 'next/router';
import { useCallback, useState } from 'react';

import { Publication } from '../../../types/publication';

import { getAPIClient } from '../../../services/apiClient';
import { errorToast, successToast } from '../../../utils/toast';

import { PageTitle } from '../../Layout/PageTitle';
import { PageLayout } from '../../Layout/PageLayout';
import { PublicationCard } from '../../Cards/PublicationCard';
import { ModalEditPublication } from '../../Modais/ModalEditPublication';
import { PublicationCardControls } from '../../Cards/PublicationCard/PublicationCardControls';
import { ResolvedPublication } from '../../Cards/PublicationCard/ResolvedPublication';

interface MyPublicationViewProps {
  publications: Publication[];
}

export const MyPublicationView: React.FC<MyPublicationViewProps> = ({
  publications,
}) => {
  const [selectedPublication, setSelectedPublication] =
    useState<Publication | null>(null);

  const [isModalEditPublicationOpen, setIsModalEditPublicationOpen] =
    useState(false);

  const handleOpenModalEditPublication = useCallback(
    (publication: Publication) => {
      setSelectedPublication(publication);
      setIsModalEditPublicationOpen(true);
    },
    [],
  );

  const handleCloseModalEditPublication = useCallback((isRefresh: boolean) => {
    setSelectedPublication(null);
    setIsModalEditPublicationOpen(false);

    if (isRefresh) {
      Router.replace(Router.asPath);
    }
  }, []);

  const resolvePublication = useCallback(async (publicationId: string) => {
    try {
      await getAPIClient().patch(`publicacoes/${publicationId}`, {
        isResolvido: true,
      });

      successToast({ message: 'Publicação alterada com sucesso.' });

      Router.replace(Router.asPath);
    } catch (err) {
      errorToast({ message: 'Não foi possível alterar publicação.' });
      console.error({ err });
    }
  }, []);

  const deletePublication = useCallback(async (publicationId: string) => {
    try {
      await getAPIClient().delete(`publicacoes/${publicationId}`);

      successToast({ message: 'Publicação excluída com sucesso.' });

      Router.replace(Router.asPath);
    } catch (err) {
      errorToast({ message: 'Não foi possível remover a publicação.' });
      console.error({ err });
    }
  }, []);

  return (
    <PageLayout>
      <ModalEditPublication
        isOpen={isModalEditPublicationOpen}
        publication={selectedPublication}
        onRequestClose={handleCloseModalEditPublication}
      />

      <PageTitle title="Minhas publicaçãoes" />

      {publications.map(publication => (
        <PublicationCard
          key={publication.publicacaoId}
          publication={publication}
          anexoId={publication.anexos[0]}
        >
          {publication.isResolvido ? (
            <ResolvedPublication situation={publication.situacao} />
          ) : (
            <PublicationCardControls
              situation={publication.situacao}
              onResolve={() => resolvePublication(publication.publicacaoId)}
              onEdit={() => handleOpenModalEditPublication(publication)}
              onDelete={() => deletePublication(publication.publicacaoId)}
            />
          )}
        </PublicationCard>
      ))}
    </PageLayout>
  );
};
