import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { parseCookies } from 'nookies';

import { Publication } from '../../@types/publication';
import { getAPIClient } from '../../services/apiClient';
import { errorToast, successToast } from '../../utils/toast';

import { PageLayout } from '../../components/PageLayout';
import { PageTitle } from '../../components/PageTitle';
import { PublicationCard } from '../../components/PublicationCard';
import { NoPublication } from '../../components/NoPublication';
import { ModalEditPublication } from '../../components/ModalEditPublication';

interface MyPublicationProps {
  myPublications: Publication[];
}

const MyPublication: NextPage<MyPublicationProps> = ({ myPublications }) => {
  const router = useRouter();
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
      router.replace(router.asPath);
    }
  }, []);

  const resolvePublication = useCallback(async (publicationId: string) => {
    try {
      await getAPIClient().patch(`publicacoes/${publicationId}`, {
        isResolvido: true,
      });

      successToast({ message: 'Publicação alterada com sucesso.' });

      router.replace(router.asPath);
    } catch (err) {
      errorToast({ message: 'Não foi possível alterar publicação.' });
      console.error({ err });
    }
  }, []);

  const deletePublication = useCallback(async (publicationId: string) => {
    try {
      await getAPIClient().delete(`publicacoes/${publicationId}`);

      successToast({ message: 'Publicação excluída com sucesso.' });

      router.replace(router.asPath);
    } catch (err) {
      errorToast({ message: 'Não foi possível remover a publicação.' });
      console.error({ err });
    }
  }, []);

  if (!myPublications || myPublications.length === 0) {
    return (
      <PageLayout>
        <NoPublication title="Nenhuma publicação encontrada." />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <ModalEditPublication
        isOpen={isModalEditPublicationOpen}
        publication={selectedPublication}
        onRequestClose={isRefresh => handleCloseModalEditPublication(isRefresh)}
      />

      <PageTitle title="Minhas publicaçãoes" />

      {myPublications.map(publication => (
        <PublicationCard
          key={publication.publicacaoId}
          data={{
            categoria: publication.categoria,
            createdAt: new Date(publication.createdAt).toLocaleString(),
            isResolvido: publication.isResolvido,
            nome: publication.nome,
            porte: publication.porte,
            sexo: publication.sexo,
            situacao: publication.situacao,
            anexo: publication.anexos[0],
          }}
          controlsMethods={{
            onResolve: () => resolvePublication(publication.publicacaoId),
            onEdit: () => handleOpenModalEditPublication(publication),
            onDelete: () => deletePublication(publication.publicacaoId),
          }}
        />
      ))}
    </PageLayout>
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

  try {
    const { data } = await getAPIClient(ctx).get<Publication[]>(
      'minhas-publicacoes',
    );

    return {
      props: {
        myPublications: data,
      },
    };
  } catch (err) {
    return {
      props: {
        myPublications: [],
      },
    };
  }
};

export default MyPublication;
