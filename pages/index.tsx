import type { GetStaticProps } from 'next';
import type { Post } from '@prisma/client';
import remark from 'remark';
import html from 'remark-html';

import { getPosts } from '@/lib/posts';
import Layout from '@/components/Layout';
import type PostType from '@/types/post.type';
import PostList from '@/components/blog/PostList';

export default function Home({ posts }: Props) {
  return (
    <Layout>
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4rem md:text-7xl md:leading-10">
          Latest
        </h1>
        <p className="text-lg pt-4 text-gray-500">All the latest posts</p>
      </div>
      <PostList posts={posts} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts: Post[] = await getPosts();

  posts.map(async (post) => {
    let mdxContentV = await remark().use(html).process(post.content);
    let mdxContent = mdxContentV.toString();
    if (mdxContent.length > 400) mdxContent = mdxContent.substr(0, 400).concat('...');

    post.content = mdxContent;
  });

  return {
    props: { posts },
  };
};

type Props = {
  posts: PostType[];
};
