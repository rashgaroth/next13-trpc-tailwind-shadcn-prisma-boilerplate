import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

const prismaClientSingleton = () => {
  return new PrismaClient();
};

if (process.env.NODE_ENV === 'production') {
  prisma = prismaClientSingleton();
} else {
  if (!global.prisma) {
    global.prisma = prismaClientSingleton();
  }
  prisma = global.prisma as PrismaClient;
}

export const prismaInstance = prisma;
