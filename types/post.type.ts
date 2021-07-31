import type AuthorType from './author.type';

type PostType = {
  id: number;
  title: string;
  slug: string;
  author: AuthorType;
  category: {
    name: string;
  };
  content: string;
  mdxContent?: string;
  createdAt: number;
  published: boolean;
  tags: string[];
};

export default PostType;
