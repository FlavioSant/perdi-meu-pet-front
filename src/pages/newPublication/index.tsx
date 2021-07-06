import { NextPage } from 'next';
import { PageContainer } from '../../components/PageContainer';

import { PageLayout } from '../../components/PageLayout';
import { PageTitle } from '../../components/PageTitle';

const NewPublication: NextPage = () => {
  return (
    <PageLayout>
      <PageTitle title="Crie sua Publicação" />
      <PageContainer description="Dados do Pet">
        <p>Informe a situação do pet abaixo:</p>
      </PageContainer>
    </PageLayout>
  );
};

export default NewPublication;
