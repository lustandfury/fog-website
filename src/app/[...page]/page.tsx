import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Add this function to generate static paths
export async function generateStaticParams() {
  const pages = await builder.getAll('page', {
    fields: 'data.url', // only get the URL field
    options: { noTargeting: true }
  });
  
  return pages.map((page) => ({
    page: page.data?.url?.split('/').filter(Boolean) || []
  }));
}

// Add revalidation
export const revalidate = 3600; // revalidate every hour

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const content = await builder
    // Get the page content from Builder with the specified options
    .get("page", {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
      },
      // Set prerender to true for static generation
      prerender: true,
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
