import { useRouter } from 'next/router';

import Head from './Head';
import Body from './Body';
import Navbar from './Navbar';

export default function Layout({ children }: Props) {
  const router = useRouter();

  return (
    <>
      <Head />

      <Navbar />

      <Body>{children}</Body>
    </>
  );
}

type Props = {
  children: React.ReactNode;
};
