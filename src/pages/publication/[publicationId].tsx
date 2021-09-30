import { NextPage } from 'next';

import { auth } from '../../middleware/auth';
import { Publication } from '../../types/publication';
import { getAPIClient } from '../../services/apiClient';
import { NoPublication } from '../../components/NoPublication';
import { PageLayout } from '../../components/Layout/PageLayout';
import { serverSideHandler } from '../../functions/serverSideHandler';
import { PublicationDetailView } from '../../components/Templates/PublicationDetailView';

interface PublicationDetailProps {
  publication: Publication;
}

const PublicationDetail: NextPage<PublicationDetailProps> = ({ publication }) =>
  !publication ? (
    <PageLayout>
      <NoPublication title="Publicação não encontrada..." hasGoBack />
    </PageLayout>
  ) : (
    <PublicationDetailView publication={publication} />
  );

export const getServerSideProps = serverSideHandler(auth(), async ctx => {
  const { publicationId } = ctx.query;

  const { data: publication } = await getAPIClient(ctx).get(
    `/publicacoes/${publicationId}`,
  );

  return {
    props: {
      publication,
    },
  };
});

export default PublicationDetail;
