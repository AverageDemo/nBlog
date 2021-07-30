import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';

import moment from 'moment';
import type { Post } from '@prisma/client';

import Layout from '@/components/Layout';
import type PostType from '@/types/post.type';
import { getPosts, getPostsByTag } from '@/lib/posts';

export default function Home({ tag, posts }: Props) {
  return (
    <Layout>
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4rem md:text-7xl md:leading-10">
          {tag}
        </h1>
        <p className="text-lg pt-4 text-gray-500">Viewing all posts for tag &apos;{tag}&apos;</p>
      </div>
      <ul className="divide-y divide-gray-200">
        {posts.length ? (
          posts.map((post) => (
            <li key={post.id} className="py-8">
              <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium text-gray-500">
                    <time dateTime="2021-06-17T14:00:00.000Z">{moment(post.createdAt).format('MMMM Do, YYYY')}</time>
                  </dd>
                  <dt className="sr-only">By</dt>
                  <dd className="text-base font-small text-gray-500">By {post.author.username}</dd>
                </dl>
                <div className="space-y-5 xl:col-span-3">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">
                      <a className="text-gray-900" href="/tailwindcss-2-2">
                        {post.title}
                      </a>
                    </h2>
                    <div className="max-w-none text-gray-500">
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
                  <div>
                    {post.tags.map((tag) => (
                      <Link key={tag} href={`/t/${tag}`}>
                        <a>
                          <span className="inline-flex items-center px-2.5 py-0.5 mr-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {tag}
                          </span>
                        </a>
                      </Link>
                    ))}
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

export const getStaticPaths: GetStaticPaths = async () => {
  let tags: string[] = [];

  const posts: Post[] = await getPosts();

  // Merge all posts tags into one array
  posts.forEach((post) => {
    tags = [...tags, ...post.tags];
  });

  // Remove duplicate tags
  tags = Array.from(new Set(tags));

  const paths = tags.map((tag) => ({
    params: { tag },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { tag } = params as { tag: string };

  const posts = await getPostsByTag(tag);

  return {
    props: { tag, posts },
  };
};

type Props = {
  tag: string;
  posts: PostType[];
};
