import { TitleContainer } from './styles';

interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
  <TitleContainer>
    <h1>{title}</h1>
  </TitleContainer>
);
