import Link from 'next/link';
import Image from 'next/image';
import gravatar from 'gravatar';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { signOut } from 'next-auth/client';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { MenuAlt1Icon, XIcon } from '@heroicons/react/outline';
import { SearchIcon, SelectorIcon } from '@heroicons/react/solid';

import { classNames } from '@/lib/utils';
import { navigation } from '@/lib/navigation';
import DHeader from '@/components/dashboard/DHeader';

export default function DashboardSidebar({ tags, session, title, children }: Props) {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();

  return (
    <>
      <Transition.Root show={showSidebar} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 lg:hidden"
          open={showSidebar}
          onClose={setShowSidebar}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setShowSidebar(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4 h-8 w-auto">
                <Link href={navigation.baseUrl.href}>
                  <a className="text-4xl font-semibold text-blue-400">nBlog</a>
                </Link>
                {/* LOGO
                  <Image
                  layout="intrinsic"
                  width="240"
                  height="240"
                  src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
                  alt="Workflow"
                /> */}
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2">
                  <div className="space-y-1">
                    {Object.values(navigation.dashboard.sidebar).map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            router.pathname === item.href
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                            'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                          )}
                          aria-current={router.pathname === item.href ? 'page' : undefined}
                        >
                          <item.icon
                            className={classNames(
                              router.pathname === item.href
                                ? 'text-gray-500'
                                : 'text-gray-400 group-hover:text-gray-500',
                              'mr-3 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h3
                      className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      id="teams-headline"
                    >
                      Tags
                    </h3>
                    <div className="mt-1 space-y-1" role="group" aria-labelledby="teams-headline">
                      {tags &&
                        tags.map((tag) => (
                          <Link
                            key={tag}
                            href={{
                              pathname: '/t/[tag]',
                              query: { tag },
                            }}
                          >
                            <a className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
                              <span className="bg-blue-400 w-2.5 h-2.5 mr-4 rounded-full" aria-hidden="true" />
                              <span className="truncate">{tag}</span>
                            </a>
                          </Link>
                        ))}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100">
          <div className="flex items-center flex-shrink-0 px-6 h-8 w-auto">
            <Link href={navigation.baseUrl.href}>
              <a className="text-4xl font-semibold text-blue-400">nBlog</a>
            </Link>
            {/* LOGO
              <Image
              src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
              alt="Workflow"
              layout="intrinsic"
              width="240"
              height="240"
            /> */}
          </div>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            {/* User account dropdown */}
            <Menu as="div" className="px-3 mt-6 relative inline-block text-left">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                      <span className="flex w-full justify-between items-center">
                        <span className="flex min-w-0 items-center justify-between space-x-3">
                          <div className="w-10 h-10">
                            <Image
                              src={gravatar.url(String(session?.user?.email), { s: '100' }, true)}
                              alt=""
                              width="500"
                              height="500"
                              className="rounded-full"
                            />
                          </div>
                          <span className="flex-1 flex flex-col min-w-0">
                            <span className="text-gray-900 text-sm font-medium truncate">{session?.user?.name}</span>
                          </span>
                        </span>
                        <SelectorIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </span>
                    </Menu.Button>
                  </div>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                    >
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              View profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              <button onClick={() => signOut()}>Logout</button>
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
            {/* Sidebar Search */}
            <div className="px-3 mt-5">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <SearchIcon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search"
                />
              </div>
            </div>
            {/* Navigation */}
            <nav className="px-3 mt-6">
              <div className="space-y-1">
                {Object.values(navigation.dashboard.sidebar).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      router.pathname === item.href
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                    aria-current={router.pathname === item.href ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        router.pathname === item.href ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-8">
                {/* Secondary navigation */}
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider" id="teams-headline">
                  Tags
                </h3>
                <div className="mt-1 space-y-1" role="group" aria-labelledby="teams-headline">
                  {tags &&
                    tags.map((tag) => (
                      <Link
                        key={tag}
                        href={{
                          pathname: '/t/[tag]',
                          query: { tag },
                        }}
                      >
                        <a className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50">
                          <span className="bg-blue-400 w-2.5 h-2.5 mr-4 rounded-full" aria-hidden="true" />
                          <span className="truncate">{tag}</span>
                        </a>
                      </Link>
                    ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* Main column */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Search header */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setShowSidebar(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search_field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search_field"
                    name="search_field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </form>
            </div>

            <div className="flex items-center">
              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8">
                          <Image
                            src={gravatar.url(String(session?.user?.email), { s: '100' }, true)}
                            alt=""
                            width="500"
                            height="500"
                            className="rounded-full"
                          />
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                      >
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                View profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                <button onClick={() => signOut()}>Logout</button>
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <DHeader title={title} />
          {children}
        </main>
      </div>
    </>
  );
}

type Props = {
  tags?: string[];
  session?: Session | null;
  title?: string;
  children: React.ReactNode;
};
