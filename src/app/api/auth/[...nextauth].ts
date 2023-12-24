import NextAuth from 'next-auth/next';

import { authOptions } from '@/config/next-auth';

export default NextAuth(authOptions);
