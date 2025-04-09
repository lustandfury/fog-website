import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { builder } from '@builder.io/react';
import { BuilderPage } from './components/BuilderPage';
import EditSymbol from './components/EditSymbol';

// Initialize the Builder SDK with your API key
builder.init(import.meta.env.VITE_BUILDER_API_KEY);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/edit-symbol" element={<EditSymbol />} />
        <Route path="*" element={<BuilderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App