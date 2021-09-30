import Router from 'next/router';

import { Button } from '../Forms/Button';

import { NoPublicationContainer } from './styles';

interface NoPublicationProps {
  title: string;
  description?: string;
  hasGoBack?: boolean;
}

export const NoPublication: React.FC<NoPublicationProps> = ({
  description,
  hasGoBack,
  title,
}) => (
  <NoPublicationContainer>
    <img src="/no-publications.svg" alt="Nenhuma publicação" />
    <h2>{title}</h2>
    {description && <p>{description}</p>}
    {hasGoBack && (
      <Button
        type="button"
        marginTop="2rem"
        width="200px"
        onClick={() => Router.back()}
      >
        Voltar
      </Button>
    )}
  </NoPublicationContainer>
);
