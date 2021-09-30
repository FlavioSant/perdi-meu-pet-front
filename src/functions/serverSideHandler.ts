import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ServerSideError } from '../utils/ServerSideErrors';

export type ServerSideHandler = (
  context: GetServerSidePropsContext,
) => Promise<GetServerSidePropsResult<any> | void>;

export const serverSideHandler =
  (...fns: ServerSideHandler[]): ServerSideHandler =>
  async ctx => {
    try {
      for (const fn of fns) {
        const value = await fn(ctx);

        if (value != null) {
          return value;
        }
      }
    } catch (err) {
      const status = err instanceof ServerSideError ? err.status : 500;
      let message = err.message;

      if (status === 500) {
        console.error(err);

        if (process.env.NODE_ENV === 'production') {
          message = 'Internal server error';
        }
      }

      return {
        props: {
          error: {
            status,
            message,
          },
        },
      };
    }
  };
