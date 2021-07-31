import { Prisma } from '@prisma/client';

import prisma from '@/lib/prisma';
import { Post } from '@prisma/client';
import NewPostDto from '@/dtos/new-post.dto';
import type PostStatistics from '@/types/post-statistics.type';

export const getPosts = async (published: boolean = true, slug?: string): Promise<Post[]> => {
  const posts: Post[] = await prisma.post.findMany({
    where: {
      slug,
      published,
    },
    include: {
      category: { select: { name: true } },
      author: { select: { username: true, name: true } },
    },
    orderBy: {
      createdAt: 'desc',
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
      author: { select: { username: true, email: true, name: true } },
    },
  });

  return post;
};

export const getPostsByTag = async (tag: string): Promise<Post[]> => {
  const posts: Post[] = await prisma.post.findMany({
    where: {
      tags: {
        has: tag,
      },
      published: true,
    },
    include: {
      author: { select: { username: true, name: true } },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return posts;
};

export const createPost = async (newPostDto: NewPostDto): Promise<Post | object | null> => {
  try {
    const post: Post = await prisma.post.create({
      data: newPostDto,
    });

    if (post) return post;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return {
          status: 500,
          message: 'A post with this title already exists',
        };
      }

      throw new Error(e.message);
    }
  }

  return null;
};

export const getPostStatistics = async (): Promise<PostStatistics> => {
  let postStatistics: PostStatistics = {};
  const posts: Post[] = await prisma.post.findMany();

  postStatistics.total = posts.length;

  postStatistics.drafts = posts.filter((post) => {
    return post.published === false;
  }).length;

  postStatistics.published = posts.filter((post) => {
    return post.published === true;
  }).length;

  return postStatistics;
};
