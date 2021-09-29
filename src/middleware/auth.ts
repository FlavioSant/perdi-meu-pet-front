import { parseCookies } from 'nookies';
import { serverSideHandler } from '../functions/serverSideHandler';

export const auth = () =>
  serverSideHandler(async ctx => {
    const { ['perdi-meu-pet']: token } = parseCookies(ctx);

    if (!token) {
      return {
        redirect: {
          destination: '/signIn',
          permanent: false,
        },
      };
    }
  });
