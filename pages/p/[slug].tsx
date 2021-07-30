import type { GetStaticPaths, GetStaticProps } from 'next';
import type { Post } from '@prisma/client';

import remark from 'remark';
import html from 'remark-html';

import Layout from '@/components/Layout';
import type PostType from '@/types/post.type';
import BlogPost from '@/components/blog/BlogPost';
import { getPostBySlug, getPosts } from '@/lib/posts';

export default function Home({ post }: Props) {
  return (
    <Layout>
      <BlogPost>{post}</BlogPost>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: Post[] = await getPosts();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let content;
  const { slug } = params as { slug: string };

  const post = await getPostBySlug(slug);

  if (post && post.content) {
    content = await remark().use(html).process(post.content);
    post.content = content.toString();
  }

  return {
    props: { post },
  };
};

type Props = {
  post: PostType;
};
