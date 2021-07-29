import prisma from '@/lib/prisma';
import { Post } from '@prisma/client';

export const getPosts = async (slug?: string, published: boolean = true): Promise<Post[]> => {
  const posts: Post[] = await prisma.post.findMany({
    where: {
      slug,
      published,
    },
    include: {
      author: { select: { username: true } },
    },
  });

  return posts;
};

export const getPostBySlug = async (slug: string) => {
  const post = await prisma.post.findFirst({
    where: {
      slug,
    },
    include: {
      author: { select: { username: true } },
    },
  });

  return post;
};
