import Router from 'next/router';
import { NextPage } from 'next';

import { auth } from '../../middleware/auth';
import { Publication } from '../../types/publication';
import { getAPIClient } from '../../services/apiClient';
import { serverSideHandler } from '../../functions/serverSideHandler';
import { PublicationDetailView } from '../../components/Templates/PublicationDetailView';
import { PageLayout } from '../../components/Layout/PageLayout';
import { Button } from '../../components/Forms/Button';
import { NoPublication } from '../../components/NoPublication';

interface PublicationDetailProps {
  publication: Publication;
}

const PublicationDetail: NextPage<PublicationDetailProps> = ({ publication }) =>
  !publication ? (
    <PageLayout>
      <NoPublication title="Publicação não encontrada..." />
      <Button
        type="button"
        onClick={() => Router.back()}
        style={{ margin: '2rem auto', width: 250 }}
      >
        Voltar
      </Button>
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
