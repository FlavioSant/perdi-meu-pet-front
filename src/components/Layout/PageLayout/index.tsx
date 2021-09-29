import { PageHeader } from '../PageHeader';
import { PageFooter } from '../PageFooter';

import { LayoutContainer } from './styles';

export const PageLayout: React.FC = ({ children }) => (
  <LayoutContainer>
    <PageHeader />
    <main>{children}</main>
    <PageFooter />
  </LayoutContainer>
);
