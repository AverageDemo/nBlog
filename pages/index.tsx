import moment from 'moment';
import type { GetStaticProps } from 'next';
import type { Post } from '@prisma/client';

import { getPosts } from '@/lib/posts';
import Layout from '@/components/Layout';
import type PostType from '@/types/post.type';

export default function Home({ posts }: Props) {
  return (
    <Layout>
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4rem md:text-6xl md:leading-10">
          Latest
        </h1>
        <p className="text-lg text-gray-500">All the latest posts</p>
      </div>
      <ul className="divide-y divide-gray-200">
        {posts.length ? (
          posts.map((post) => (
            <li key={post.id}>
              {post.title} by {post.author.username} on {moment(post.createdAt).format('MMMM Do YYYY')}
            </li>
          ))
        ) : (
          <li>No posts to display</li>
        )}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts: Post[] = await getPosts();

  return {
    props: { posts },
  };
};

type Props = {
  posts: PostType[];
};
