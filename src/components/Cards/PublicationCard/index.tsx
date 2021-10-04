import { Publication } from '../../../types/publication';

import { InfoContainer, PublicationCardContainer } from './styles';

interface PublicationCardProps {
  publication: Publication;
  anexoId?: string;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({
  anexoId,
  children,
  publication,
}) => (
  <PublicationCardContainer isResolved={publication.isResolvido}>
    <InfoContainer>
      {anexoId && (
        <img
          src={`${process.env.API_URL}/anexos/${anexoId}`}
          alt={publication.nome || publication.categoria}
        />
      )}
      <article>
        {publication.nome && <h2>{publication.nome}</h2>}
        <p>
          Publicado em: <span>{publication.createdAt}</span>
        </p>
        <p>
          Situação: <span>{publication.situacao}</span>
        </p>
        <p>
          Categoria: <span>{publication.categoria}</span>
        </p>
        <p>
          Porte: <span>{publication.porte}</span>
        </p>
        <p>
          Sexo do Animal: <span>{publication.sexo || 'Não informado'}</span>
        </p>
      </article>
    </InfoContainer>
    {children}
  </PublicationCardContainer>
);
