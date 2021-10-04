import Image from 'next/image';
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
    <figure>
      <Image
        src="/no-publications.svg"
        alt="Nenhuma publicação"
        title="Ilustração de animais"
        width={190}
        height={190}
      />
    </figure>

    <article>
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
    </article>
  </NoPublicationContainer>
);
