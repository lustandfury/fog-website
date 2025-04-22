import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";


interface PageProps {
  params: Promise<{ page: string[] }>;
}

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default async function Page({params}: PageProps) {
  const { page = [] } = await params;
  const content = await builder
    // Get the page content from Builder with the specified options
    .get("page", {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + ((await page)?.join("/") || ""),
      },
      // Set prerender to true to return HTML instead of JSON
      prerender: false,
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
        {/* Render the Builder page */}
        <RenderBuilderContent content={content} />
    </>
  );
}
