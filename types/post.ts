import { AuthorType } from './author';

export type PostType = {
  id: number;
  title: string;
  author: AuthorType;
  content: string;
  createdAt: number;
  published: boolean;
};
