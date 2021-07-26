import { AuthorType } from './author';

type PostType = {
  id: number;
  title: string;
  author: AuthorType;
  content: string;
  createdAt: number;
  published: boolean;
};

export default PostType;
