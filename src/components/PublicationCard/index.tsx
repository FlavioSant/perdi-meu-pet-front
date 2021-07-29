import { FiCheck, FiEdit3, FiTrash2 } from 'react-icons/fi';

import { Button } from '../Button';

import {
  ButtonsContainer,
  InfoContainer,
  PublicationCardContainer,
} from './styles';

interface CardData {
  categoria: 'cachorro' | 'gato' | 'outros';
  createdAt: string;
  nome?: string;
  anexo?: string;
  porte: 'pequeno' | 'medio' | 'grande';
  sexo: 'femea' | 'macho' | 'outros';
  situacao: 'desaparecido' | 'encontrado' | 'adocao';
}

interface PublicationCardProps {
  data: CardData;
  hasControls?: boolean;
  onEditPublication?: () => void;
  onDeletePublication?: () => void;
}

const PublicationCard: React.FC<PublicationCardProps> = ({
  data,
  hasControls = false,
  onEditPublication,
  onDeletePublication,
}) => {
  return (
    <PublicationCardContainer>
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

      {hasControls && (
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

          <Button
            type="button"
            styleType="blue"
            title="Editar Publicação"
            onClick={onEditPublication}
          >
            <FiEdit3 size={18} />
            Editar
          </Button>

          <Button
            type="button"
            styleType="red"
            title="Excluir Publicação"
            onClick={onDeletePublication}
          >
            <FiTrash2 size={18} />
            Excluir
          </Button>
        </ButtonsContainer>
      )}
    </PublicationCardContainer>
  );
};

export { PublicationCard };
