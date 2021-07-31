import { Category, Prisma } from '@prisma/client';

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

export const getAllPosts = async (): Promise<Post[]> => {
  const posts: Post[] = await prisma.post.findMany({
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
    }

    console.debug(e.message);
  }

  return null;
};

export const getCategories = async () => {
  const categories: Category[] = await prisma.category.findMany();

  return categories;
};
