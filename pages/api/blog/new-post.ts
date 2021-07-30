import { getSession } from 'next-auth/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';
import { Post } from '@prisma/client';

import { getUser } from '@/lib/users';
import { createPost } from '@/lib/posts';
import NewPostDto from '@/dtos/new-post.dto';
import UserRole from '@/enums/user-role.enum';
import type UserData from '@/types/user-data.type';

type ResponseData = {
  message?: string;
  post?: object | Post | null;
};

const newPost = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    if (session?.user?.email) {
      const user: UserData | null = await getUser(session.user.email);

      if (user && (user.role === UserRole.ADMIN || user.role === UserRole.AUTHOR)) {
        let newPostDto: NewPostDto = req.body;

        newPostDto.authorId = user.id;
        newPostDto.cid = Number(newPostDto.cid);

        // Tags are input as a comma delimited string. Split them and remove whitespace
        newPostDto.tags = String(newPostDto.tags)
          .split(',')
          .map((tag) => {
            return tag.trim();
          });
        newPostDto.slug = slugify(newPostDto.title).toLowerCase();

        const createdPost: object | Post | null = await createPost(newPostDto);

        // TODO: Return the slug to be able to allow redirect. Will implement once the new post form is created
        res.status(200).json({ post: createdPost });
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
