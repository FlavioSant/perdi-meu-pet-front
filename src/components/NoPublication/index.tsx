import { NoPublicationContainer } from './styles';

interface NoPublicationProps {
  title: string;
  description?: string;
}

const NoPublication: React.FC<NoPublicationProps> = ({
  description,
  title,
}) => {
  return (
    <NoPublicationContainer>
      <img src="/no-publications.svg" alt="Nenhuma publicação" />
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </NoPublicationContainer>
  );
};

export { NoPublication };
