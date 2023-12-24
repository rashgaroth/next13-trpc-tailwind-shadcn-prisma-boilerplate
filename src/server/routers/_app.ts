import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { userRoute } from '@/server/routers/user.route';
import { router } from '@/server/trpc';

export const appRouter = router({
  user: userRoute,
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
