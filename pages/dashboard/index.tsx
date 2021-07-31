import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/client';
import Layout from '@/components/Layout';

export default function DashboardIndexPage() {
  const router = useRouter();
  const [session, loading] = useSession();

  if (!loading && !session) {
    router.push('/login');
    return null;
  }

  return <Layout>Test</Layout>;
}
