import { PageHeader } from '../PageHeader';
import { PageFooter } from '../PageFooter';

import { LayoutContainer } from './styles';

const PageLayout: React.FC = ({ children }) => {
  return (
    <LayoutContainer>
      <PageHeader />
      <main>{children}</main>
      <PageFooter />
    </LayoutContainer>
  );
};

export { PageLayout };
