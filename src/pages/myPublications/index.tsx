import { NextPage } from 'next';

import { PageLayout } from '../../components/PageLayout';
import { PageTitle } from '../../components/PageTitle';
import { MyPublicationCard } from '../../components/PublicationCard';

const fakeData = [
  {
    id: 1,
    categoria: 'cachorro',
    createdAt: '13/07/2021',
    nome: 'dog',
    anexo: '',
    porte: 'pequeno',
    sexo: 'macho',
    situacao: 'desaparecido',
  },
  {
    id: 2,
    categoria: 'cachorro',
    createdAt: '13/07/2021',
    nome: 'dog',
    anexo: '',
    porte: 'pequeno',
    sexo: 'macho',
    situacao: 'desaparecido',
  },
] as const;

const MyPublication: NextPage = () => {
  return (
    <PageLayout>
      <PageTitle title="Minhas Publicações" />
      {fakeData.map(data => (
        <MyPublicationCard key={data.id} data={data} hasControls />
      ))}
    </PageLayout>
  );
};

export default MyPublication;
