import Link from 'next/link';
import { 
  ClipboardCheck,
  AlertTriangle,
  Lightbulb,
  ToyBrick,
  CircleDollarSign,
  PanelTop,
  Target,
  FileText,
  Megaphone
} from 'lucide-react';

interface NavigationItem {
  key: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  isActive: boolean;
  isDisabled: boolean;
  order: number;
}

interface IdeaNavigationSidebarProps {
  ideaId: string;
  currentStep: 'evaluation' | 'pain-points' | 'solution' | 'prototype' | 'monetization' | 'landing-pages' | 'ads-campaign' | 'mvp-document' | 'testing';
  isLoading?: boolean;
}

export function IdeaNavigationSidebar({ ideaId, currentStep, isLoading = false }: IdeaNavigationSidebarProps) {
  const allNavigationItems: NavigationItem[] = [
    {
      key: 'evaluation',
      label: 'Initial evaluation',
      icon: ClipboardCheck,
      href: `/${ideaId}/evaluation`,
      isActive: currentStep === 'evaluation',
      isDisabled: false,
      order: 1,
    },
    {
      key: 'pain-points',
      label: 'Pain Points',
      icon: AlertTriangle,
      href: `/${ideaId}/pain-points`,
      isActive: currentStep === 'pain-points',
      isDisabled: false,
      order: 2,
    },
    {
      key: 'solution',
      label: 'Solution',
      icon: Lightbulb,
      href: `/${ideaId}/solution`,
      isActive: currentStep === 'solution',
      isDisabled: true,
      order: 3,
    },
    {
      key: 'prototype',
      label: 'Prototype',
      icon: ToyBrick,
      href: `/${ideaId}/prototype`,
      isActive: currentStep === 'prototype',
      isDisabled: true,
      order: 4,
    },
    {
      key: 'monetization',
      label: 'Monetization',
      icon: CircleDollarSign,
      href: `/${ideaId}/monetization`,
      isActive: currentStep === 'monetization',
      isDisabled: true,
      order: 5,
    },
    {
      key: 'landing-pages',
      label: 'Landing Pages',
      icon: PanelTop,
      href: `/${ideaId}/landing-pages`,
      isActive: currentStep === 'landing-pages',
      isDisabled: true,
      order: 6,
    },
    {
      key: 'ads-campaign',
      label: 'Ads Campaign',
      icon: Megaphone,
      href: `/${ideaId}/ads-campaign`,
      isActive: currentStep === 'ads-campaign',
      isDisabled: true,
      order: 7,
    },
    {
      key: 'mvp-document',
      label: 'MVP Document',
      icon: FileText,
      href: `/${ideaId}/mvp-document`,
      isActive: currentStep === 'mvp-document',
      isDisabled: true,
      order: 8,
    },
    {
      key: 'testing',
      label: 'Testing',
      icon: Target,
      href: `/${ideaId}/testing`,
      isActive: currentStep === 'testing',
      isDisabled: true,
      order: 9,
    }
  ];

  // Find current step order and enable next item
  const currentStepOrder = allNavigationItems.find(item => item.isActive)?.order || 0;
  
  const navigationItems = allNavigationItems.map(item => {
    // If we're on the testing step (final step), disable all other steps except completed ones
    if (currentStep === 'testing') {
      return {
        ...item,
        isDisabled: !item.isActive && item.order !== 9, // Only testing step is enabled
      };
    }
    
    // Normal flow: enable current and next item only
    return {
      ...item,
      isDisabled: item.order > currentStepOrder + 1,
    };
  });

  if (isLoading) {
    return (
      <aside className="w-64 bg-gray-50 p-8 border-r">
        <nav>
          <ul>
            <li className="mb-4">
              <div className="flex items-center p-2">
                <div className="mr-2 h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </li>
            <li className="mb-4">
              <div className="flex items-center bg-blue-100 rounded-lg p-2">
                <div className="mr-2 h-4 w-4 bg-blue-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-blue-200 rounded animate-pulse"></div>
              </div>
            </li>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <li key={i} className="mb-4">
                <div className="flex items-center p-2">
                  <div className="mr-2 h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-gray-50 p-8 border-r">
      <nav>
        <ul>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            
            if (item.isDisabled) {
              return (
                <li key={item.key} className="mb-4">
                  <div className="flex items-center text-sm font-medium text-gray-400 cursor-not-allowed p-2">
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </div>
                </li>
              );
            }

            if (item.isActive) {
              return (
                <li key={item.key} className="mb-4">
                  <div className="flex items-center text-sm font-medium text-blue-600 bg-blue-100 rounded-lg p-2">
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </div>
                </li>
              );
            }

            // If item has href and is not disabled, make it clickable
            if (item.href && !item.isDisabled) {
              return (
                <li key={item.key} className="mb-4">
                  <Link 
                    href={item.href} 
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            }

            // For disabled items or items without href
            return (
              <li key={item.key} className="mb-4">
                <div className="flex items-center text-sm font-medium text-gray-400 cursor-not-allowed p-2">
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}