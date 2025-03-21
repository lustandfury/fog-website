import { config } from 'dotenv';
import { builder } from '@builder.io/sdk';

// Load environment variables from .env file
config();

// Initialize Builder with your API key
const apiKey = process.env.VITE_BUILDER_API_KEY;
if (!apiKey) {
  throw new Error('VITE_BUILDER_API_KEY is not defined in .env file');
}

builder.init(apiKey);

async function createNavigation() {
  try {
    console.log('Creating navigation content...');
    
    const navigationData = {
      data: {
        logo: 'https://cdn.builder.io/api/v1/image/assets%2F3726974884634c6bab0631b586f830bd%2Fa6435ad228f54573849a4538f49f85d9',
        primaryItems: [
          {
            label: 'Products',
            url: '/products',
            dropdownItems: [
              {
                title: 'Analytics',
                description: 'Get a better understanding of your traffic',
                url: '/products/analytics',
                icon: 'BarChart'
              },
              {
                title: 'Engagement',
                description: 'Speak directly to your customers',
                url: '/products/engagement',
                icon: 'Users'
              }
            ]
          },
          {
            label: 'Solutions',
            url: '/solutions',
            dropdownItems: [
              {
                title: 'Marketing',
                description: 'Boost your conversion rates',
                url: '/solutions/marketing',
                icon: 'Globe'
              },
              {
                title: 'Sales',
                description: 'Improve your revenue streams',
                url: '/solutions/sales',
                icon: 'DollarSign'
              }
            ]
          }
        ],
        secondaryItems: [
          {
            label: 'Sign in',
            url: '/signin',
            icon: 'LogIn'
          },
          {
            label: 'Contact sales',
            url: '/contact',
            icon: 'Phone'
          }
        ]
      },
      published: 'published'
    };

    const response = await fetch(`https://builder.io/api/v1/write/navigation?apiKey=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(navigationData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create navigation: ${response.status} ${response.statusText}`);
    }

    console.log('Navigation created successfully!');
  } catch (error) {
    console.error('Error creating navigation:', error);
    throw error;
  }
}

// Execute the creation
createNavigation().catch(console.error);