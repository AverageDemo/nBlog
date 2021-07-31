import { getSession } from 'next-auth/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';
import { Post } from '@prisma/client';

import { getUser } from '@/lib/users';
import { createPost } from '@/lib/posts';
import NewPostDto from '@/dtos/new-post.dto';
import UserRole from '@/enums/user-role.enum';
import type UserData from '@/types/user-data.type';

const newPost = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    if (session?.user?.email) {
      const user: UserData | null = await getUser(session.user.email);

      if (user && (user.role === UserRole.ADMIN || user.role === UserRole.AUTHOR)) {
        let newPostDto: NewPostDto = req.body;

        newPostDto.authorId = user.id;
        newPostDto.cid = Number(newPostDto.cid);
        newPostDto.published = Boolean(newPostDto.published);

        // Tags are input as a comma delimited string. Split them and remove whitespace
        newPostDto.tags = String(newPostDto.tags)
          .split(',')
          .map((tag) => {
            return tag.trim();
          });
        newPostDto.slug = slugify(newPostDto.title).toLowerCase();

        const createdPost: CreatedPost = await createPost(newPostDto);

        if (createdPost.status !== 200) return res.status(createdPost.status).json({ message: createdPost.message });

        res.status(200).json({ post: createdPost.post });
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

type CreatedPost = {
  post?: Post | null;
  status: number;
  message?: string;
};

type ResponseData = {
  message?: string;
  post?: Post | null;
};

export default newPost;
