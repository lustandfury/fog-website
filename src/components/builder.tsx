"use client";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import type { BuilderContent } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import "../builder-registry";

interface BuilderPageProps {
  content?: BuilderContent;
}

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export function RenderBuilderContent({ content }: BuilderPageProps) {
  return (
    <>
      {content ? 
        <BuilderComponent content={content} model="page" /> 
        : 
        <DefaultErrorPage statusCode={404} />}
    </>
  );
}