import type AuthorType from './author.type';

type PostType = {
  id: number;
  title: string;
  slug: string;
  author: AuthorType;
  content: string;
  mdxContent?: string;
  createdAt: number;
  published: boolean;
  tags: string[];
};

export default PostType;
