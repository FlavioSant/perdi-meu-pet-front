import { FiCheck, FiEdit3, FiTrash2 } from 'react-icons/fi';

import { Button } from '../Button';

import {
  ButtonsContainer,
  InfoContainer,
  PublicationCardContainer,
} from './styles';

interface CardData {
  sexoAnimal?: 'femea' | 'macho';
  categoria: 'cachorro' | 'gato' | 'outros';
  createdAt: string;
  nomePet?: string;
  imageURL?: string;
  porte: 'pequeno' | 'medio' | 'grande';
  situacao: 'desaparecido' | 'encontrado' | 'adocao';
}

interface MyPublicationCardProps {
  data: CardData;
}

const MyPublicationCard: React.FC<MyPublicationCardProps> = ({ data }) => {
  return (
    <PublicationCardContainer>
      <InfoContainer>
        {data.imageURL && (
          <img
            src="https://source.unsplash.com/random"
            alt={data.nomePet || data.categoria}
          />
        )}
        <article>
          {data.nomePet && <h2>{data.nomePet}</h2>}
          <p>
            Publicado em: <span>{data.createdAt}</span>
          </p>
          <p>
            Situação: <span>{data.situacao}</span>
          </p>
          <p>
            Categoria: <span>{data.categoria}</span>
          </p>
          <p>
            Porte: <span>{data.porte}</span>
          </p>
          <p>
            Sexo do Animal: <span>{data.sexoAnimal || 'Não informado'}</span>
          </p>
        </article>
      </InfoContainer>
      <ButtonsContainer>
        {data.situacao !== 'encontrado' && (
          <Button
            type="button"
            styleType="green"
            title={`Marcar Como ${
              data.situacao === 'desaparecido'
                ? 'Encontrado'
                : data.situacao === 'adocao' && 'Adotado'
            }`}
          >
            <FiCheck size={18} />
            {data.situacao === 'desaparecido' && 'Encontrado'}
            {data.situacao === 'adocao' && 'Adotado'}
          </Button>
        )}
        <Button type="button" styleType="blue" title="Editar Publicação">
          <FiEdit3 size={18} />
          Editar
        </Button>
        <Button type="button" styleType="red" title="Excluir Publicação">
          <FiTrash2 size={18} />
          Excluir
        </Button>
      </ButtonsContainer>
    </PublicationCardContainer>
  );
};

export { MyPublicationCard };
