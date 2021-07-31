import prisma from '@/lib/prisma';
import type UserData from '@/types/user-data.type';

export const getUser = async (email: string): Promise<UserData | null> => {
  const user: UserData | null = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      password: false,
    },
  });

  if (user) return user;

  return null;
};
