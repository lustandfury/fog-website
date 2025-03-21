import { BuilderComponent } from '@builder.io/react';

interface Props {
  content?: any;
}

export function RenderContent({ content }: Props) {
  return (
    <BuilderComponent
      content={content}
      model="page"
    />
  );
}