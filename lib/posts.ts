import { Prisma } from '@prisma/client';

import prisma from '@/lib/prisma';
import { Post } from '@prisma/client';
import NewPostDto from '@/dtos/new-post.dto';

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

export const getPostsByTag = async (tag: string): Promise<Post[]> => {
  const posts: Post[] = await prisma.post.findMany({
    where: {
      tags: {
        has: tag,
      },
      published: true,
    },
    include: {
      author: { select: { username: true } },
    },
  });

  return posts;
};

export const createPost = async (newPostDto: NewPostDto): Promise<Post | object | null> => {
  try {
    const post: Post = await prisma.post.create({
      data: {
        cid: newPostDto.cid,
        tags: newPostDto.tags,
        title: newPostDto.title,
        slug: newPostDto.slug,
        content: newPostDto.content,
        authorId: newPostDto.authorId,
      },
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
