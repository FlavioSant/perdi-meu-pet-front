import { Container, Description } from './styles';

interface PageContainerProps {
  description?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  description,
}) => (
  <Container>
    {description && (
      <Description>
        <h2>{description}</h2>
      </Description>
    )}
    <div>{children}</div>
  </Container>
);
