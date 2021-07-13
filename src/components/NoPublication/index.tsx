import { NoPublicationContainer } from './styles';

const NoPublication: React.FC = () => {
  return (
    <NoPublicationContainer>
      <img src="/no-publications.svg" alt="Nenhuma publicação" />
      <h2>Nenhuma publicação por aqui...</h2>
      <p>Preencha os campos acima e clique em buscar publicações!</p>
    </NoPublicationContainer>
  );
};

export { NoPublication };
