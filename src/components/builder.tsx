import { builder } from '@builder.io/sdk';
import { BuilderComponent, useIsPreviewing } from '@builder.io/react';
import DefaultErrorPage from 'next/error';

interface BuilderContentProps {
  content: any;
}

export function RenderBuilderContent({ content }: BuilderContentProps) {
  const isPreviewing = useIsPreviewing();

  if (!content && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <BuilderComponent
      content={content}
      model="page"
    />
  );
}