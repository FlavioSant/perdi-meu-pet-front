import { TitleContainer } from './styles';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <TitleContainer>
      <h1>{title}</h1>
    </TitleContainer>
  );
};

export { PageTitle };
