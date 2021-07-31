import { navigation } from '@/lib/navigation';
import Link from 'next/link';

export default function DHeader({ title }: Props) {
  return (
    <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">{title}</h1>
      </div>
      <div className="mt-4 flex sm:mt-0 sm:ml-4">
        <Link href={navigation.dashboard.newPost.href}>
          <a className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3">
            New Post
          </a>
        </Link>
      </div>
    </div>
  );
}

DHeader.defaultProps = {
  title: 'Home',
};

type Props = {
  title: string;
};
