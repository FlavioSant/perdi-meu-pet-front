import { NextPage } from 'next';

import { PageLayout } from '../../components/PageLayout';
import { PageTitle } from '../../components/PageTitle';
import { MyPublicationCard } from '../../components/PublicationCard';

interface MyPublicationProps {
  sexoAnimal?: 'femea' | 'macho';
  categoria: 'cachorro' | 'gato' | 'outros';
  createdAt: string;
  id: number;
  nomePet?: string;
  imageURL?: string;
  porte: 'pequeno' | 'medio' | 'grande';
  situacao: 'desaparecido' | 'encontrado' | 'adocao';
}

const fakeData: MyPublicationProps[] = [
  {
    id: 1,
    categoria: 'cachorro',
    createdAt: '13/07/2021',
    porte: 'grande',
    situacao: 'desaparecido',
    imageURL: 'https://source.unsplash.com/random',
    nomePet: 'Nome do Pet',
    sexoAnimal: 'macho',
  },
  {
    id: 2,
    categoria: 'gato',
    createdAt: '13/07/2021',
    porte: 'pequeno',
    situacao: 'encontrado',
    imageURL: 'https://source.unsplash.com/random',
    nomePet: 'Nome do Pet',
    sexoAnimal: 'femea',
  },
  {
    id: 3,
    categoria: 'outros',
    createdAt: '13/07/2021',
    porte: 'medio',
    situacao: 'adocao',
    imageURL: 'https://source.unsplash.com/random',
    nomePet: 'Nome do Pet',
    sexoAnimal: 'macho',
  },
  {
    id: 4,
    categoria: 'cachorro',
    createdAt: '21/07/2021',
    porte: 'medio',
    situacao: 'desaparecido',
  },
];

const MyPublication: NextPage = () => {
  return (
    <PageLayout>
      <PageTitle title="Minhas publicaçãoes" />
      {fakeData.map(data => (
        <MyPublicationCard key={data.id} data={data} />
      ))}
    </PageLayout>
  );
};

export default MyPublication;
