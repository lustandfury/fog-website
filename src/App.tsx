import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { builder } from '@builder.io/react';
import { BuilderPage } from './components/BuilderPage';
import { Navbar } from './components/Navigation/Navbar';

// Initialize the Builder SDK with your API key
builder.init(import.meta.env.VITE_BUILDER_API_KEY);

function App() {
  const [navData, setNavData] = useState<any>(null);

  useEffect(() => {
    async function fetchNavigation() {
      try {
        const navigation = await builder.get('navigation', {
          options: { includeRefs: true },
        }).promise();

        if (navigation) {
          // Transform the data to match the Navbar component's expected structure
          const transformedData = {
            logo: navigation.data.logo,
            primaryItems: navigation.data.primaryItems || [],
            secondaryItems: navigation.data.secondaryItems || []
          };
          setNavData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching navigation:', error);
      }
    }

    fetchNavigation();
  }, []);

  return (
    <BrowserRouter>
      {navData && <Navbar {...navData} />}
      <Routes>
        <Route path="*" element={<BuilderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App