import Link from 'next/link';
import Image from 'next/image';
import gravatar from 'gravatar';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { signIn, signOut, useSession } from 'next-auth/client';

import { navigation } from '@/lib/navigation';

export default function Navbar() {
  const [session, loading] = useSession();

  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <header className="flex justify-between items-center py-10">
        <div>
          <Link href={navigation.baseUrl.href}>
            <a aria-label="nBlog">
              {/* Your logo should go here */}
              <div className="text-4xl font-semibold text-blue-400">nBlog</div>
            </a>
          </Link>
        </div>
        {!session && (
          <>
            <div className="text-base leading-5">
              <button onClick={() => signIn()} className="font-medium text-gray-500 hover:text-gray-700">
                Login
              </button>
            </div>
          </>
        )}
        {session && (
          <>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                        <div className="w-8 h-8">
                          <Image
                            src={gravatar.url(String(session?.user?.email), { s: '100' }, true)}
                            alt=""
                            width="500"
                            height="500"
                            className="rounded-full"
                          />
                        </div>
                        <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                          <span className="sr-only">Open user menu for </span>
                          {session?.user?.name}
                        </span>
                        <ChevronDownIcon
                          className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                          aria-hidden="true"
                        />
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
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <Menu.Item>
                          {({ active }) => (
                            <Link href={navigation.navbar.dashboard.href}>
                              <a className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700">
                                {navigation.navbar.dashboard.name}
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href={navigation.navbar.settings.href}>
                              <a className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700">
                                {navigation.navbar.settings.name}
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700">
                              <button onClick={() => signOut()}>Logout</button>
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </>
        )}
      </header>
    </div>
  );
}
