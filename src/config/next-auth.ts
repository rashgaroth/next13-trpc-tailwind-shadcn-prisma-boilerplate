import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { prismaInstance } from '@/prisma';

export const authOptions: NextAuthOptions = {
  callbacks: {
    session(params) {
      if (params?.session?.user?.id) {
        params.session.user.id = params?.user?.id;
      }
      return params.session;
    },
  },
  adapter: PrismaAdapter(prismaInstance),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
};
