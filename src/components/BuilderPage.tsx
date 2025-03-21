import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { builder, BuilderComponent, useIsPreviewing } from '@builder.io/react';

// Register custom components
import '../builder-registry';

export function BuilderPage() {
  const location = useLocation();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const isPreviewing = useIsPreviewing();

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      try {
        const content = await builder
          .get('page', {
            userAttributes: {
              urlPath: location.pathname,
            },
            options: {
              includeRefs: true,
            },
          })
          .promise();

        setContent(content);
      } catch (error) {
        console.error('Error fetching Builder content:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!content && !isPreviewing) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-black/95 backdrop-blur-sm p-8 rounded-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-gray-300 mb-6">
            This page hasn't been created yet in Builder.io. To create content for this page:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Log in to your Builder.io account</li>
            <li>Create a new page for the URL: {location.pathname}</li>
            <li>Publish your page</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <BuilderComponent
      model="page"
      content={content}
    />
  );
}