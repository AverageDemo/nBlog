import Link from 'next/link';
import moment from 'moment';
import type PostType from '@/types/post.type';

export default function PostList({ posts }: Props) {
  return (
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
                <dd className="text-base font-small text-gray-500">
                  By{' '}
                  <Link href={`/u/${String(post.author.username).toLowerCase()}`}>
                    <a>{post.author.name}</a>
                  </Link>
                </dd>
              </dl>
              <div className="space-y-5 xl:col-span-3">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">
                    <Link href={`/p/${post.slug}`}>
                      <a className="text-gray-900">{post.title}</a>
                    </Link>
                  </h2>
                  <div className="prose lg:prose-xl max-w-none text-gray-500">
                    <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                </div>
                {post.content.length > 400 && (
                  <div className="text-base font-medium">
                    <Link href={`/p/${post.slug}`}>
                      <a className="text-green-600 hover:text-green-700" aria-label={`Read "${post.title}"`}>
                        Read more &rarr;
                      </a>
                    </Link>
                  </div>
                )}
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
  );
}

type Props = {
  posts: PostType[];
};
