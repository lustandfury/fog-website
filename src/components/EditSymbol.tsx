import { BuilderComponent, builder } from '@builder.io/react';
import '../builder-registry';

// Initialize Builder.io with your API key.
builder.init(import.meta.env.VITE_BUILDER_API_KEY);

const EditSymbol: React.FC = () => {
  return <BuilderComponent model="symbol" />;
};

export default EditSymbol; 