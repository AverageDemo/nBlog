import DashboardLayout from '@/components/dashboard/DLayout';
import DashboardDraftTable from '@/components/dashboard/Index/DraftTable';
import DashboardStatistics from '@/components/dashboard/Index/Statistics';

const drafts = [
  {
    id: 1,
    category: 'Test Category',
    title: 'Test draft',
    tags: ['tag', 'test'],
    created: 'March 17, 2020',
    bgColorClass: 'bg-pink-600',
  },
];

export default function DashboardIndexPage() {
  return (
    <DashboardLayout>
      <div className="px-4 mt-6 sm:px-6 lg:px-8">
        <DashboardStatistics />
      </div>

      <DashboardDraftTable drafts={drafts} />
    </DashboardLayout>
  );
}
