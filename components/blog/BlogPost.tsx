import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import gravatar from 'gravatar';

import type PostType from '@/types/post.type';

export default function BlogPost({ children }: Props) {
  return (
    <article className="xl:divide-y xl:divide-gray-200">
      <header className="pt-2 xl:pb-10">
        <div className="space-y-1 text-center">
          <dl className="space-y-10">
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base leading-6 font-medium text-gray-500">
                <time dateTime="2021-06-17T14:00:00.000Z">
                  {moment(children.createdAt).format('dddd, MMMM Do, YYYY')}
                </time>
              </dd>
            </div>
          </dl>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl md:text-5xl md:leading-[3.5rem]">
              {children.title}
            </h1>
            <div className="pt-6">
              {children.tags.map((tag) => (
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
        </div>
      </header>
      <div className="xl:grid xl:grid-cols-4 xl:gap-x-6 pb-16 xl:pb-20">
        <dl className="pb-10 xl:pt-11">
          <dt className="sr-only">Authors</dt>
          <dd>
            <ul className="flex justify-center xl:block space-x-8 sm:space-x-12 xl:space-x-0 xl:space-y-8 divide-y divide-gray-200">
              <li className="flex items-center space-x-2">
                <div className="w-10 h-10">
                  <Image
                    src={gravatar.url(children.author.email, { s: '100' }, true)}
                    alt=""
                    width="500"
                    height="500"
                    className="rounded-full"
                  />
                </div>
                <dl className="text-sm font-medium whitespace-no-wrap">
                  <dt className="sr-only">Name</dt>
                  <dd className="text-gray-900">{children.author.name}</dd>
                  <dt className="sr-only">Username</dt>
                  <dd>
                    <Link href={`/u/${children.author.username.toLowerCase()}`}>
                      <a className="text-blue-400 hover:text-blue-500">{`@${children.author.username}`}</a>
                    </Link>
                  </dd>
                </dl>
              </li>
              <li className="flex items-center space-x-2">
                <div className="pt-8">
                  <Link href="/">
                    <a className="text-blue-400 hover:text-blue-500">&larr; Back to the blog</a>
                  </Link>
                </div>
              </li>
            </ul>
          </dd>
        </dl>

        <div
          className="prose lg:prose-xl xl:pb-0 xl:col-span-3 xl:row-span-2 pt-8"
          dangerouslySetInnerHTML={{ __html: children.content }}
        />
      </div>
    </article>
  );
}

type Props = {
  children: PostType;
};
