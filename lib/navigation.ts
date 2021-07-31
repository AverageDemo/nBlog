import { LibraryIcon, HomeIcon, CollectionIcon, DocumentAddIcon } from '@heroicons/react/outline';

export const navigation = {
  baseUrl: { name: 'Home', href: '/' },
  dashboard: {
    newPost: { name: 'New Post', href: '/dashboard/new' },
    viewPost: { name: 'View Post', href: '/dashboard/p/[slug]' },
    sidebar: {
      home: {
        name: 'Home',
        href: '/dashboard',
        icon: HomeIcon,
      },
      published: {
        name: 'Published Posts',
        href: '/dashboard/published',
        icon: CollectionIcon,
      },
      drafts: { name: 'Drafts', href: '/dashboard/drafts', icon: LibraryIcon },
      new: { name: 'New Post', href: '/dashboard/new', icon: DocumentAddIcon },
    },
  },
  navbar: {
    dashboard: { name: 'Dashboard', href: '/dashboard' },
    settings: { name: 'Settings', href: '#' },
  },
};
