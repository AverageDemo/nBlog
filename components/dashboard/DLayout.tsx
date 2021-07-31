import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import DashboardSidebar from '@/components/dashboard/DSidebar';

export default function DashboardLayout({ title, children }: Props) {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;

  if (!loading && !session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <DashboardSidebar session={session} title={title}>
        {children}
      </DashboardSidebar>
    </div>
  );
}

type Props = {
  title?: string;
  children: React.ReactNode;
};
