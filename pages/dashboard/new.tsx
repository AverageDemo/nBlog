import type { Category, Post } from '@prisma/client';
import type { GetStaticProps } from 'next';
import { useSession } from 'next-auth/client';

import { getAllPosts, getCategories } from '@/lib/posts';
import DashboardLayout from '@/components/dashboard/DLayout';
import NewPost from '@/components/dashboard/Posts/NewPost';

export default function DashboardNewPostPage({ tags, categories }: Props) {
  const [session, loading] = useSession();

  return (
    <DashboardLayout title="New Post" tags={tags}>
      <div className="px-4 mt-6 sm:px-6 lg:px-8">
        <NewPost session={session} categories={categories} />
      </div>
    </DashboardLayout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts: Post[] = await getAllPosts();

  let tags: string[] = [];

  posts.forEach((post) => {
    tags = Array.from(new Set([...tags, ...post.tags]));
  });

  const categories: Category[] = await getCategories();

  return {
    props: { tags, categories },
  };
};

type Props = {
  tags?: string[];
  categories?: Category[];
};
