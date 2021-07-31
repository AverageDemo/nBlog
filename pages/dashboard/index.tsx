import type { Post } from '@prisma/client';
import type { GetStaticProps } from 'next';

import { getAllPosts } from '@/lib/posts';
import type PostType from '@/types/post.type';
import DashboardLayout from '@/components/dashboard/DLayout';
import type PostStatistics from '@/types/post-statistics.type';
import DashboardDraftTable from '@/components/dashboard/Index/DraftTable';
import DashboardStatistics from '@/components/dashboard/Index/Statistics';

export default function DashboardIndexPage({ drafts, stats, tags }: Props) {
  return (
    <DashboardLayout tags={tags}>
      <div className="px-4 mt-6 sm:px-6 lg:px-8">
        <DashboardStatistics stats={stats} />
      </div>

      <DashboardDraftTable drafts={drafts} />
    </DashboardLayout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts: Post[] = await getAllPosts();

  const drafts: Post[] = posts.filter((post) => {
    return post.published === false;
  });

  const publishedPostCount: number = posts.filter((post) => {
    return post.published === true;
  }).length;

  const stats: PostStatistics = {
    drafts: drafts.length,
    published: publishedPostCount,
    total: drafts.length + publishedPostCount,
  };

  let tags: string[] = [];

  posts.forEach((post) => {
    tags = Array.from(new Set([...tags, ...post.tags]));
  });

  return {
    props: { drafts, stats, tags },
  };
};

type Props = {
  tags?: string[];
  drafts: PostType[];
  stats: PostStatistics;
};
