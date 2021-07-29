interface NewPostDto {
  cid: number;
  tags: string | string[];
  title: string;
  content: string;
  authorId: number;
  slug: string;
}

export default NewPostDto;
