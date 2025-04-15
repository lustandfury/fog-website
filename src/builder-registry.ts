import { Builder } from '@builder.io/react';
import { Heading } from './components/Heading';
import { Card } from './components/Card';
import { CallToAction } from './components/CallToAction';
import { LogoParade } from './components/LogoParade';
import { CardGrid } from './components/CardGrid';
import { Navbar } from './components/Navigation/Navbar';

// Shared icon options for reuse
const NAVIGATION_ICONS = [
  'Activity', 'AlertCircle', 'Archive', 'BarChart', 'Bell', 'Book', 'Briefcase',
  'Building2', 'Calendar', 'Camera', 'ChartPie', 'Chip', 'Cloud', 'Code', 'Cog', 
  'Database', 'FileText', 'Globe', 'Heart', 'HelpCircle', 'Home', 'Image',
  'Laptop', 'Layout', 'LifeBuoy', 'Link', 'Lock', 'Mail', 'Map', 'MessageCircle',
  'Phone', 'PieChart', 'Settings', 'Shield', 'ShoppingCart', 'Star', 'Tool',
  'Truck', 'User', 'Users', 'Video', 'Wallet', 'Zap',
  // Iconoir icons
  'AirConditioner', 'AirplaneHelix', 'AlignCenter', 'AppleMac', 'AppNotification',
  'AppWindow', 'ArrowSeparate', 'AtomIcon', 'BatteryCharging', 'BezierCurve',
  'Bluetooth', 'Bonfire', 'BookStack', 'Brain', 'CameraPlus', 'ChatBubble',
  'CloudSync', 'CoinIcon', 'ColorFilter', 'CrownIcon', 'CubeIcon', 'DataTransfer',
  'DesignPencil', 'DiamondIcon', 'EmojiSatisfied', 'Fingerprint', 'FireIcon',
  'Flashlight', 'GiftIcon', 'GlassHalf', 'GlobeIcon', 'GpsIcon', 'GraphIcon',
  'HexagonIcon', 'HomeIcon', 'HourglassIcon', 'IndustryIcon', 'KeyIcon', 'Keyframes',
  'LaptopIcon', 'LightBulb', 'LockKey', 'MagicWand', 'MediaImage', 'NavArrowDown',
  'NetworkIcon', 'PaletteIcon', 'PinIcon', 'PlanetSat', 'PlayIcon', 'PuzzleIcon',
  'RocketIcon', 'SearchWindow', 'ShieldIcon', 'SparklesIcon', 'CircleSpark', 'StarIcon', 'SunLight',
  'ThunderIcon', 'TrophyIcon', 'UmbrellaIcon', 'VoiceCircled', 'WalletIcon', 'WifiIcon'
];

const SECONDARY_NAV_ICONS = [
  'LogIn', 'Mail', 'Phone', 'MessageCircle', 'HelpCircle', 'User', 'ExternalLink',
  // Iconoir secondary icons
  'LoginCircle', 'MailIcon', 'PhoneIcon', 'ChatLines', 'HelpCircleIcon', 'UserIcon',
  'OpenNewWindow'
];

// Register navigation model
Builder.register('model', {
  name: 'navigation',
  hideFromUI: false,
  fields: [
    {
      name: 'logo',
      type: 'url',
      defaultValue: 'https://cdn.builder.io/api/v1/image/assets%2F3726974884634c6bab0631b586f830bd%2Fa6435ad228f54573849a4538f49f85d9',
      helperText: 'URL of the logo image'
    },
    {
      name: 'logoUrl',
      type: 'string',
      defaultValue: '/',
      helperText: 'URL to navigate to when clicking the logo'
    },
    {
      name: 'primaryItems',
      type: 'list',
      defaultValue: [],
      subFields: [
        {
          name: 'label',
          type: 'string',
          required: true,
        },
        {
          name: 'url',
          type: 'string'
        },
        {
          name: 'dropdownItems',
          type: 'list',
          subFields: [
            {
              name: 'title',
              type: 'string',
              required: true,
              helperText: 'Title of the dropdown item'
            },
            {
              name: 'description',
              type: 'longText',
              helperText: 'Description text for the dropdown item'
            },
            {
              name: 'url',
              type: 'string',
              required: true,
              helperText: 'URL to navigate to when clicking the item'
            },
            {
              name: 'isOffering',
              type: 'boolean',
              defaultValue: false,
              helperText: 'Enable to display as an offering card with header, description and image'
            },
            {
              name: 'offeringImageUrl',
              type: 'file',
              helperText: 'Image for the offering card (only used if isOffering is enabled)'
            },
            {
              name: 'offeringAltText',
              type: 'string',
              defaultValue: '',
              helperText: 'Alt text for the offering image'
            },
            {
              name: 'offeringLinkText',
              type: 'string',
              defaultValue: 'Learn about our Workshop',
              helperText: 'Text for the offering card link (only used if isOffering is enabled)'
            }
          ]
        }
      ]
    },
    {
      name: 'secondaryItems',
      type: 'list',
      defaultValue: [],
      subFields: [
        {
          name: 'label',
          type: 'string',
          required: true,
        },
        {
          name: 'url',
          type: 'string',
          required: true,
        },
        {
          name: 'icon',
          type: 'string',
          enum: SECONDARY_NAV_ICONS,
        }
      ]
    }
  ]
});

// Register components
Builder.registerComponent(Navbar, {
  name: 'Navigation Bar',
  inputs: [
    {
      name: 'logo',
      type: 'url',
      defaultValue: 'https://cdn.builder.io/api/v1/image/assets%2F3726974884634c6bab0631b586f830bd%2Fa6435ad228f54573849a4538f49f85d9'
    },
    {
      name: 'primaryItems',
      type: 'list',
      defaultValue: [],
      subFields: [
        {
          name: 'label',
          type: 'string',
          required: true,
        },
        {
          name: 'url',
          type: 'string',
          required: true,
        },
        {
          name: 'dropdownItems',
          type: 'list',
          subFields: [
            {
              name: 'title',
              type: 'string',
              required: true,
              helperText: 'Title of the dropdown item'
            },
            {
              name: 'description',
              type: 'string',
              helperText: 'Description text for the dropdown item'
            },
            {
              name: 'url',
              type: 'string',
              required: true,
              helperText: 'URL to navigate to when clicking the item'
            },
            {
              name: 'isOffering',
              type: 'boolean',
              defaultValue: false,
              helperText: 'Enable to display as an offering card with header, description and image'
            },
            {
              name: 'offeringImageUrl',
              type: 'file',
              helperText: 'Image for the offering card (only used if isOffering is enabled)'
            },
            {
              name: 'offeringAltText',
              type: 'string',
              defaultValue: '',
              helperText: 'Alt text for the offering image'
            },
            {
              name: 'offeringLinkText',
              type: 'string',
              defaultValue: 'Learn about our Workshop',
              helperText: 'Text for the offering card link (only used if isOffering is enabled)'
            }
          ]
        }
      ]
    },
    {
      name: 'secondaryItems',
      type: 'list',
      defaultValue: [],
      subFields: [
        {
          name: 'label',
          type: 'string',
          required: true,
        },
        {
          name: 'url',
          type: 'string',
          required: true,
        },
        {
          name: 'icon',
          type: 'string',
          enum: SECONDARY_NAV_ICONS,
        }
      ]
    }
  ]
});

Builder.registerComponent(LogoParade, {
  name: 'Logo Parade',
  inputs: [
    {
      name: 'row1Title',
      type: 'string',
      defaultValue: 'Financial Services & Insurance Firms'
    },
    {
      name: 'row2Title',
      type: 'string',
      defaultValue: 'Enterprise Global Operations'
    },
    {
      name: 'row3Title',
      type: 'string',
      defaultValue: 'Technology & Innovation Leaders'
    },
    {
      name: 'row1Logos',
      type: 'list',
      subFields: [
        {
          name: 'url',
          type: 'url',
          required: true,
        },
        {
          name: 'alt',
          type: 'string',
          required: true,
        },
        {
          name: 'width',
          type: 'number',
          defaultValue: 150,
        }
      ]
    },
    {
      name: 'row2Logos',
      type: 'list',
      subFields: [
        {
          name: 'url',
          type: 'url',
          required: true,
        },
        {
          name: 'alt',
          type: 'string',
          required: true,
        },
        {
          name: 'width',
          type: 'number',
          defaultValue: 150,
        }
      ]
    },
    {
      name: 'row3Logos',
      type: 'list',
      subFields: [
        {
          name: 'url',
          type: 'url',
          required: true,
        },
        {
          name: 'alt',
          type: 'string',
          required: true,
        },
        {
          name: 'width',
          type: 'number',
          defaultValue: 150,
        }
      ]
    },
    {
      name: 'speed',
      type: 'number',
      defaultValue: 30,
      helperText: 'Animation speed (1-100)',
      min: 1,
      max: 100
    }
  ]
});

Builder.registerComponent(CardGrid, {
  name: 'Card Grid',
  inputs: [
    {
      name: 'cards',
      type: 'list',
      subFields: [
        {
          name: 'imageUrl',
          type: 'url',
          helperText: 'URL of the card image'
        },
        {
          name: 'title',
          type: 'string',
          helperText: 'Card title'
        },
        {
          name: 'description',
          type: 'longText',
          helperText: 'Card description'
        }
      ]
    },
    {
      name: 'columns',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 4,
      helperText: 'Number of columns in desktop view (1-4)'
    },
    {
      name: 'gap',
      type: 'number',
      defaultValue: 8,
      min: 4,
      max: 16,
      helperText: 'Gap between cards (4-16)'
    }
  ]
});

Builder.registerComponent(Heading, {
  name: 'Heading',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Enter heading text'
    },
    {
      name: 'size',
      type: 'enum',
      enum: ['small', 'medium', 'large'],
      defaultValue: 'medium'
    }
  ]
});

Builder.registerComponent(Card, {
  name: 'Card',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Card Title'
    },
    {
      name: 'description',
      type: 'longText',
      defaultValue: 'Card description goes here'
    },
    {
      name: 'imageUrl',
      type: 'url',
      helperText: 'URL of the card image'
    }
  ]
});

Builder.registerComponent(CallToAction, {
  name: 'Call to Action',
  inputs: [
    {
      name: 'text',
      type: 'string',
      defaultValue: 'Ready to get started?'
    },
    {
      name: 'buttonText',
      type: 'string',
      defaultValue: 'Learn More'
    },
    {
      name: 'buttonUrl',
      type: 'url',
      defaultValue: '#'
    },
    {
      name: 'variant',
      type: 'enum',
      enum: ['primary', 'secondary'],
      defaultValue: 'primary'
    }
  ]
});