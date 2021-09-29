import * as Yup from 'yup';

import { ServerSideError } from '../utils/ServerSideErrors';
import { serverSideHandler } from '../functions/serverSideHandler';

export const validateSchema = (schema: Yup.AnyObjectSchema) =>
  serverSideHandler(async ctx => {
    try {
      const parsed = await schema.validate(ctx.query);

      for (const key of Object.keys(ctx.query)) {
        delete ctx.query[key];
      }

      for (const key of Object.keys(parsed)) {
        ctx.query[key] = parsed[key];
      }
    } catch (err) {
      throw new ServerSideError(400, err.message);
    }
  });
