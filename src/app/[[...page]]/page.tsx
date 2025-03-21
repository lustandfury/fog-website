import { builder } from '@builder.io/sdk';
import { RenderBuilderContent } from '@/components/builder';
import { Navbar } from '@/components/Navigation/Navbar';

// Initialize the Builder SDK with your organization's API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}

async function getBuilderContent(urlPath: string) {
  return await builder
    .get('page', {
      userAttributes: {
        urlPath: '/' + (urlPath || ''),
      },
    })
    .promise();
}

async function getNavigationContent() {
  return await builder
    .get('navigation', {
      // Get the latest version of the navigation
      options: { includeRefs: true },
    })
    .promise();
}

export default async function Page({ params }: PageProps) {
  const [pageContent, navContent] = await Promise.all([
    getBuilderContent(params.page?.join('/') || ''),
    getNavigationContent()
  ]);

  return (
    <>
      <Navbar {...navContent?.data} />
      <div>
        <RenderBuilderContent content={pageContent} />
      </div>
    </>
  );
}