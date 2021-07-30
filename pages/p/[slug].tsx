import type { GetStaticPaths, GetStaticProps } from 'next';
import type { Post } from '@prisma/client';

import Layout from '@/components/Layout';
import type PostType from '@/types/post.type';
import { getPostBySlug, getPosts } from '@/lib/posts';

export default function Home({ post }: Props) {
  return <Layout>{post.title}</Layout>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: Post[] = await getPosts();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const post = await getPostBySlug(slug);

  return {
    props: { post },
  };
};

type Props = {
  post: PostType;
};
