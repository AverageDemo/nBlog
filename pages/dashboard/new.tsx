import type { Post } from '@prisma/client';
import type { GetStaticProps } from 'next';

import { getAllPosts } from '@/lib/posts';
import DashboardLayout from '@/components/dashboard/DLayout';

export default function DashboardNewPostPage({ tags }: Props) {
  return <DashboardLayout title="New Post" tags={tags}></DashboardLayout>;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts: Post[] = await getAllPosts();

  let tags: string[] = [];

  posts.forEach((post) => {
    tags = Array.from(new Set([...tags, ...post.tags]));
  });

  return {
    props: { tags },
  };
};

type Props = {
  tags?: string[];
};
