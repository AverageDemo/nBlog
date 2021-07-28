import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { compareSync } from 'bcryptjs';

import prisma from '@/lib/prisma';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Your username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (user) {
          if (compareSync(password, user.password)) {
            const { firstName, username, email, usergroup } = user;

            const userObj: UserData = {
              id: username,
              name: firstName,
              email,
            };

            return userObj;
          }
        }

        return null;
      },
    }),
  ],
  session: { jwt: true },
  database: process.env.DATABASE_URL,
});

type UserData = {
  id: string;
  name: string | null;
  email: string;
};
