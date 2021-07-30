import type { GetStaticPaths, GetStaticProps } from 'next';
import type { Post } from '@prisma/client';
import remark from 'remark';
import html from 'remark-html';

import Layout from '@/components/Layout';
import type PostType from '@/types/post.type';
import PostList from '@/components/blog/PostList';
import { getPosts, getPostsByTag } from '@/lib/posts';

export default function Home({ tag, posts }: Props) {
  return (
    <Layout>
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4rem md:text-7xl md:leading-10">
          {tag}
        </h1>
        <p className="text-lg pt-4 text-gray-500">Viewing all posts for tag &apos;{tag}&apos;</p>
      </div>
      <PostList posts={posts} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let tags: string[] = [];

  const posts: Post[] = await getPosts();

  // Merge all post tags into one UNIQUE array
  posts.forEach((post) => {
    tags = Array.from(new Set([...tags, ...post.tags]));
  });

  const paths = tags.map((tag) => ({
    params: { tag },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { tag } = params as { tag: string };

  const posts = await getPostsByTag(tag);

  posts.map(async (post) => {
    let mdxContentV = await remark().use(html).process(post.content);
    let mdxContent = mdxContentV.toString();
    if (mdxContent.length > 400) mdxContent = mdxContent.substr(0, 400).concat('...');

    post.content = mdxContent;
  });

  return {
    props: { tag, posts },
  };
};

type Props = {
  tag: string;
  posts: PostType[];
};
