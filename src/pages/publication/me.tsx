import { NextPage } from 'next';

import { Publication } from '../../types/publication';

import { auth } from '../../middleware/auth';
import { getAPIClient } from '../../services/apiClient';
import { serverSideHandler } from '../../functions/serverSideHandler';

import { NoPublication } from '../../components/NoPublication';
import { PageLayout } from '../../components/Layout/PageLayout';
import { MyPublicationView } from '../../components/Templates/MyPublicationView';

interface MyPublicationProps {
  publications: Publication[] | null;
}

const MyPublication: NextPage<MyPublicationProps> = ({ publications }) =>
  publications ? (
    <MyPublicationView publications={publications} />
  ) : (
    <PageLayout>
      <NoPublication title="Nenhuma publicação encontrada." hasGoBack />
    </PageLayout>
  );

export const getServerSideProps = serverSideHandler(auth(), async ctx => {
  const { data: publications } = await getAPIClient(ctx).get<Publication[]>(
    'minhas-publicacoes',
  );

  if (!publications || publications.length === 0) {
    return {
      props: {
        publications: null,
      },
    };
  }

  const parsedPublications = publications.map(publication => ({
    ...publication,
    createdAt: new Date(publication.createdAt).toLocaleString(),
  }));

  return {
    props: {
      publications: parsedPublications,
    },
  };
});

export default MyPublication;
