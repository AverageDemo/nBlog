import moment from 'moment';
import type { GetStaticProps } from 'next';
import type { Post } from '@prisma/client';

import PostType from '@/types/post';
import { getPosts } from '@/lib/posts';
import Layout from '@/components/Layout';

export default function Home({ posts }: Props) {
  return (
    <Layout>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title} by {post.author.username} on {moment(post.createdAt).format('MMMM Do YYYY')}
          </li>
        ))}
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
