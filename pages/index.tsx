import moment from 'moment';
import type { GetStaticProps } from 'next';
import type { Post } from '@prisma/client';

import { getPosts } from '@/lib/posts';
import Layout from '@/components/Layout';
import type PostType from '@/types/post.type';

export default function Home({ posts }: Props) {
  return (
    <Layout>
      <ul>
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
