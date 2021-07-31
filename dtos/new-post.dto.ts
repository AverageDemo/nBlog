interface NewPostDto {
  cid: number;
  tags: string | string[];
  title: string;
  content: string;
  authorId: number;
  published: boolean;
  slug: string;
}

export default NewPostDto;
