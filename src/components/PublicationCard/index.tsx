import Link from 'next/link';
import { FiEye } from 'react-icons/fi';

import { Category, Sex, Situation, Size } from '../../types/publication';

import { CardControls } from '../CardControls';
import {
  InfoContainer,
  PublicationCardContainer,
  ResolvedPublication,
} from './styles';

interface CardData {
  publicacaoId?: string;
  categoria: Category;
  createdAt: string;
  nome?: string;
  anexo?: string;
  isResolvido: boolean;
  porte: Size;
  sexo: Sex;
  situacao: Situation;
}

interface CardControlsMethods {
  onResolve: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

interface PublicationCardProps {
  data: CardData;
  controlsMethods?: CardControlsMethods;
}

const PublicationCard: React.FC<PublicationCardProps> = ({
  data,
  controlsMethods,
}) => {
  return (
    <PublicationCardContainer isResolved={data.isResolvido}>
      <InfoContainer>
        {data.anexo && (
          <img
            src={`${process.env.API_URL}/anexos/${data.anexo}`}
            alt={data.nome || data.categoria}
          />
        )}
        <article>
          {data.nome && <h2>{data.nome}</h2>}
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
            Sexo do Animal: <span>{data.sexo || 'Não informado'}</span>
          </p>
        </article>
      </InfoContainer>

      {data.publicacaoId && (
        <Link href={`/publicationDetail?publicationId=${data.publicacaoId}`}>
          <a title="Clique para ver detalhes da publicação">
            <FiEye size={22} />
            Ver Detalhes
          </a>
        </Link>
      )}

      {data.isResolvido ? (
        <ResolvedPublication>
          <p>
            {data.situacao === 'encontrado'
              ? 'Resgatado'
              : data.situacao === 'desaparecido'
              ? 'Encontrado'
              : 'Adotado'}
          </p>
        </ResolvedPublication>
      ) : (
        <>
          {controlsMethods && (
            <CardControls
              situation={data.situacao}
              onDelete={controlsMethods.onDelete}
              onEdit={controlsMethods.onEdit}
              onResolve={controlsMethods.onResolve}
            />
          )}
        </>
      )}
    </PublicationCardContainer>
  );
};

export { PublicationCard };
