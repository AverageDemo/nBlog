import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/client';

export default function DashboardIndexPage() {
  const router = useRouter();
  const [session, loading] = useSession();

  if (loading) return null;

  if (!loading && !session) {
    router.push('/login');
    return null;
  }

  return (
    <>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
    </>
  );
}
