import { NextPage } from 'next';

import { auth } from '../../middleware/auth';
import { serverSideHandler } from '../../functions/serverSideHandler';

import { PublicationView } from '../../components/Templates/Registrations/PublicationView';

const NewPublication: NextPage = () => {
  return <PublicationView />;
};

export const getServerSideProps = serverSideHandler(auth(), async () => ({
  props: {},
}));

export default NewPublication;
