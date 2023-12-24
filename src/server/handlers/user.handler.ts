import { AppContext } from '@/server/context';

export default class UserHandler {
  async getUserSession(ctx: AppContext) {
    return ctx.session;
  }

  async getUser(ctx: AppContext, input: { id: string }) {
    return ctx.prisma.user.findUnique({
      where: {
        id: input.id,
      },
    });
  }
}
