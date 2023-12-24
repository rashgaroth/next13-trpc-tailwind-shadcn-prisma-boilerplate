import { z } from 'zod';

import UserHandler from '@/server/handlers/user.handler';
import { privateProcedure, procedure, router } from '@/server/trpc';

const handler = new UserHandler();

export const userRoute = router({
  getUserSession: procedure.query(({ ctx }) => {
    return handler.getUserSession(ctx);
  }),
  getUser: privateProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(({ ctx, input }) => {
      return handler.getUser(ctx, input);
    }),
});
