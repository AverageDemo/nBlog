import Link from 'next/link';
import type { GetStaticProps } from 'next';
import moment from 'moment';
import type { Post } from '@prisma/client';

import { getPosts } from '@/lib/posts';
import Layout from '@/components/Layout';
import type PostType from '@/types/post.type';

export default function Home({ posts }: Props) {
  return (
    <Layout>
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4rem md:text-7xl md:leading-10">
          Latest
        </h1>
        <p className="text-lg pt-4 text-gray-500">All the latest posts</p>
      </div>
      <ul className="divide-y divide-gray-200">
        {posts.length ? (
          posts.map((post) => (
            <li key={post.id} className="py-12">
              <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium text-gray-500">
                    <time dateTime="2021-06-17T14:00:00.000Z">{moment(post.createdAt).format('MMMM Do, YYYY')}</time>
                  </dd>
                </dl>
                <div className="space-y-5 xl:col-span-3">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">
                      <a className="text-gray-900" href="/tailwindcss-2-2">
                        {post.title}
                      </a>
                    </h2>
                    <div className="prose max-w-none text-gray-500">
                      <p>
                        {post.content.substr(0, 450)}
                        {post.content.length > 450 && '...'}
                      </p>
                    </div>
                  </div>
                  <div className="text-base font-medium">
                    <Link href={`/p/${post.slug}`}>
                      <a className="text-teal-600 hover:text-teal-700" aria-label={`Read "${post.title}"`}>
                        Read more &rarr;
                      </a>
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))
        ) : (
          <li className="py-12">No posts to display yet</li>
        )}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts: Post[] = await getPosts();

  return {
    props: { posts },
  };
};

type Props = {
  posts: PostType[];
};
