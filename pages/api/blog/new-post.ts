import { getSession } from 'next-auth/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';

import { getUser } from '@/lib/users';
import type NewPostDto from 'dtos/new-post.dto';
import type UserData from '@/types/user-data.type';

type ResponseData = {
  message?: string;
};

const newPost = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    if (session?.user?.email) {
      const user: UserData | null = await getUser(session.user.email);

      // Check permissions - TODO: Change this to an ENUM
      if (user && user.usergroup === 2) {
        let newPostDto: NewPostDto = req.body;

        newPostDto.authorId = user.id;
        newPostDto.slug = slugify(newPostDto.title).toLowerCase();

        console.log(newPostDto);

        res.status(200).json({ message: 'Ok' });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowwed` });
  }
};

export default newPost;
