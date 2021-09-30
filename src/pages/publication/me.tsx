import { NextPage } from 'next';

import { Publication } from '../../types/publication';

import { auth } from '../../middleware/auth';
import { getAPIClient } from '../../services/apiClient';
import { serverSideHandler } from '../../functions/serverSideHandler';

import { NoPublication } from '../../components/NoPublication';
import { PageLayout } from '../../components/Layout/PageLayout';
import { MyPublicationView } from '../../components/Templates/MyPublicationView';

interface MyPublicationProps {
  publication: Publication[] | null;
}

const MyPublication: NextPage<MyPublicationProps> = ({ publication }) =>
  publication ? (
    <MyPublicationView publications={publication} />
  ) : (
    <PageLayout>
      <NoPublication title="Nenhuma publicação encontrada." hasGoBack />
    </PageLayout>
  );

export const getServerSideProps = serverSideHandler(auth(), async ctx => {
  const { data: publication } = await getAPIClient(ctx).get<Publication[]>(
    'minhas-publicacoes',
  );

  if (!publication || publication.length === 0) {
    return {
      props: {
        publication: null,
      },
    };
  }

  return {
    props: {
      publication,
    },
  };
});

export default MyPublication;
