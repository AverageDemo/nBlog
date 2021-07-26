import { useRouter } from 'next/router';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import styles from '@/styles/Home.module.css';

export default function Layout({ children }: Props) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Header />

      <Body>{children}</Body>

      <Footer />
    </div>
  );
}

type Props = {
  children: React.ReactNode;
};
