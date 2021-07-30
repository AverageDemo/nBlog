import Head from 'next/head';

export default function Header() {
  return (
    <>
      <Head>
        <title>nBlog</title>
        <meta name="description" content="nBlog - NextJS Open Source Blog Software" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
