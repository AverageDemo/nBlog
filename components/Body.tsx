import styles from '@/styles/Home.module.css';

export default function Body({ children }: Props) {
  return <main className={styles.main}>{children}</main>;
}

type Props = {
  children: React.ReactNode;
};
