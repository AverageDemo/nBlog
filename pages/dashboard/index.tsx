import type { Post } from '@prisma/client';
import type { GetStaticProps } from 'next';

import { getPosts, getPostStatistics } from '@/lib/posts';
import type PostType from '@/types/post.type';
import DashboardLayout from '@/components/dashboard/DLayout';
import type PostStatistics from '@/types/post-statistics.type';
import DashboardDraftTable from '@/components/dashboard/Index/DraftTable';
import DashboardStatistics from '@/components/dashboard/Index/Statistics';

export default function DashboardIndexPage({ drafts, stats }: Props) {
  return (
    <DashboardLayout>
      <div className="px-4 mt-6 sm:px-6 lg:px-8">
        <DashboardStatistics stats={stats} />
      </div>

      <DashboardDraftTable drafts={drafts} />
    </DashboardLayout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const drafts: Post[] = await getPosts(false);
  const stats = await getPostStatistics();

  return {
    props: { drafts, stats },
  };
};

type Props = {
  drafts: PostType[];
  stats: PostStatistics;
};
