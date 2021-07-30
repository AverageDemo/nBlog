import { useRouter } from 'next/router';

import Body from './Body';
import Header from './Header';
import Navbar from './Navbar';

export default function Layout({ children }: Props) {
  const router = useRouter();

  return (
    <>
      <Header />

      <Navbar />

      <Body>{children}</Body>
    </>
  );
}

type Props = {
  children: React.ReactNode;
};
