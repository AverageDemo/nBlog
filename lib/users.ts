import prisma from '@/lib/prisma';
import type UserData from '@/types/user-data.type';

export const getUser = async (email: string): Promise<UserData | null> => {
  const user: UserData | null = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      firstName: true,
      username: true,
      email: true,
      usergroup: true,
      password: false,
    },
  });

  if (user) return user;

  return null;
};
