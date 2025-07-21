import { ReactNode } from 'react';
import { IdeaNavigationSidebar } from './IdeaNavigationSidebar';

interface IdeaPageWrapperProps {
  ideaId: string;
  currentStep: 'evaluation' | 'pain-points' | 'solution' | 'prototype' | 'monetization' | 'landing-pages' | 'ads-campaign' | 'mvp-document' | 'testing';
  children: ReactNode;
  layout?: 'sidebar' | 'full-width';
  isLoading?: boolean;
}

export function IdeaPageWrapper({ 
  ideaId, 
  currentStep, 
  children, 
  layout = 'sidebar',
  isLoading = false 
}: IdeaPageWrapperProps) {
  if (layout === 'full-width') {
    // For evaluation page and other full-width layouts
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  // For sidebar layout (pain-points page)
  return (
    <div className="flex min-h-screen bg-white">
      <IdeaNavigationSidebar 
        ideaId={ideaId} 
        currentStep={currentStep} 
        isLoading={isLoading} 
      />
      {children}
    </div>
  );
}