import { NextPage } from 'next';

import { auth } from '../../middleware/auth';
import { serverSideHandler } from '../../functions/serverSideHandler';

import { NewPublicationView } from '../../components/Templates/NewPublicationView';

const NewPublication: NextPage = () => {
  return <NewPublicationView />;
};

export const getServerSideProps = serverSideHandler(auth(), async () => ({
  props: {},
}));

export default NewPublication;
