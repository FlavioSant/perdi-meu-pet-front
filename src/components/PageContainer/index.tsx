import { Container, Description } from './styles';

interface PageContainerProps {
  description?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  description,
}) => {
  return (
    <Container>
      {description && (
        <Description>
          <h2>{description}</h2>
        </Description>
      )}
      <div>{children}</div>
    </Container>
  );
};

export { PageContainer };
