import { NextPage } from 'next';

import { auth } from '../../middleware/auth';
import { serverSideHandler } from '../../functions/serverSideHandler';

import { SearchPublicationView } from '../../components/Templates/SearchPublicationView';

const SearchPublication: NextPage = () => {
  return <SearchPublicationView />;
};

export const getServerSideProps = serverSideHandler(auth(), async () => ({
  props: {},
}));

export default SearchPublication;
