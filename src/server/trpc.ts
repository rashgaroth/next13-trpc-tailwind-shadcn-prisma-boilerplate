import { initTRPC, TRPCError } from '@trpc/server';
import SuperJSON from 'superjson';
import { ZodError } from 'zod';

import { AppContext } from '@/server/context';
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<AppContext>().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        error: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});
// Base router and procedure helpers
export const router = t.router;
// A public procedure
export const procedure = t.procedure;
// A protected procedure
export const privateProcedure = t.procedure.use(
  t.middleware(({ ctx, next }) => {
    if (!ctx?.session?.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
    }
    return next({
      ctx: {
        ...ctx,
        session: {
          ...ctx.session,
          user: ctx.session.user,
        },
      },
    });
  })
);
