import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { parseCookies } from 'nookies';
import { ParsedUrlQuery } from 'querystring';

type OnErrorFunction<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
> = (
  err: any,
  ctx: GetServerSidePropsContext<Q>,
) => Promise<GetServerSidePropsResult<P>>;

interface ServerSideHandler {
  handler: GetServerSideProps;
  onError?: OnErrorFunction<
    {
      [key: string]: any;
    },
    ParsedUrlQuery
  >;
}

const defaultHandleError: OnErrorFunction = async () => {
  return {
    props: {},
  };
};

export const handleServerSide =
  ({
    handler,
    onError = defaultHandleError,
  }: ServerSideHandler): GetServerSideProps =>
  async ctx => {
    try {
      const { ['perdi-meu-pet']: token } = parseCookies(ctx);

      if (!token) {
        return {
          redirect: {
            destination: '/signIn',
            permanent: false,
          },
        };
      }

      const values = await handler(ctx);

      return values;
    } catch (err) {
      console.error(err);

      return onError(err, ctx);
    }
  };
