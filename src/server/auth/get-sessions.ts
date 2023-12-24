import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession as $getServerSession } from 'next-auth';

import { authOptions } from '@/config/next-auth';

type GetServerSessionContext =
  | {
      req: GetServerSidePropsContext['req'];
      res: GetServerSidePropsContext['res'];
    }
  | { req: NextApiRequest; res: NextApiResponse };

export const getServerSession = async (ctx: GetServerSessionContext) => {
  const sess = await $getServerSession(ctx.req, ctx.res, authOptions);
  return sess;
};
