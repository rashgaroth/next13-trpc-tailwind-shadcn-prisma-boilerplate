import { type CreateNextContextOptions } from '@trpc/server/adapters/next';

import { prismaInstance } from '@/prisma';
import { getServerSession } from '@/server/auth/get-sessions';

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getServerSession({ req, res });
  return {
    session,
    prisma: prismaInstance,
  };
};

export type AppContext = Awaited<ReturnType<typeof createContext>>;
