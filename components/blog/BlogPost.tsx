import React from 'react';
import type PostType from '@/types/post.type';

export default function BlogPost({ children }: Props) {
  return (
    <div>
      {children.title}
      <br />
      <div dangerouslySetInnerHTML={{ __html: children.mdxContent ?? children.content }} />
    </div>
  );
}

type Props = {
  children: PostType;
};
