import { CursorClickIcon, MailOpenIcon, UsersIcon } from '@heroicons/react/outline';

import type PostStatistics from '@/types/post-statistics.type';

export default function DashboardStatistics({ stats }: Props) {
  const statistics = [
    { id: 1, name: 'Total Posts', stat: stats.total, icon: UsersIcon },
    { id: 2, name: 'Active Drafts', stat: stats.drafts, icon: MailOpenIcon },
    { id: 3, name: 'Published Posts', stat: stats.published, icon: CursorClickIcon },
  ];

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statistics.map((item) => (
          <div
            key={item.id}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>

              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    {' '}
                    View all<span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

type Props = {
  stats: PostStatistics;
};
