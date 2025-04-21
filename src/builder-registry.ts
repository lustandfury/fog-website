"use client";
import { Builder } from "@builder.io/react";
import { Navbar } from "./components/Navigation/Navbar";
import { LogoParade } from "./components/LogoParade/LogoParade";

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
          required: false,
        },
        {
          name: 'dropdownItems',
          type: 'list',
          subFields: [
            {
              name: 'title',
              type: 'string',
              required: true,
            },
            {
              name: 'description',
              type: 'string',
            },
            {
              name: 'url',
              type: 'string',
              required: true,
            },
            {
              name: 'icon',
              type: 'string',
              enum: NAVIGATION_ICONS,
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