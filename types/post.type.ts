import type AuthorType from './author.type';

type PostType = {
  id: number;
  title: string;
  slug: string;
  author: AuthorType;
  content: string;
  createdAt: number;
  published: boolean;
};

export default PostType;
