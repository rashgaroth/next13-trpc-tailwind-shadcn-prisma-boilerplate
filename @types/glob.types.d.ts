import { PrismaClient } from '@prisma/client';

/* eslint-disable no-var */
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}
