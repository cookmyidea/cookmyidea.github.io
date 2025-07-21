'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiService, type IdeaObject } from '@/services/api';
import { Button } from '@/components/ui/button';
import { IdeaPageWrapper } from '@/components/IdeaPageWrapper';
import { Copy, CheckCircle, ExternalLink, Sparkles, Zap } from 'lucide-react';

export default function LandingPagesPage() {
  const [data, setData] = useState<IdeaObject['landing_pages']['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const startLandingPagesAnalysis = async () => {
      try {
        // First, check if analysis already exists
        const ideaObject = await apiService.getIdeaObject(ideaId);
        setLoading(false);
        
        if (ideaObject.landing_pages) {
          // Analysis already exists
          setData(ideaObject.landing_pages.data);
          return;
        }

        // If no analysis exists, start analysis
        setIsAnalysisRunning(true);
        
        // Trigger analysis without waiting for response
        apiService.triggerLandingPagesAnalysis(ideaId).catch(error => {
          console.error('Error triggering landing pages analysis:', error);
        });

        // Start polling every 5 seconds
        pollInterval = setInterval(async () => {
          try {
            const updatedIdeaObject = await apiService.getIdeaObject(ideaId);
            
            if (updatedIdeaObject.landing_pages) {
              setData(updatedIdeaObject.landing_pages.data);
              setIsAnalysisRunning(false);
              clearInterval(pollInterval);
            }
          } catch (error) {
            console.error('Error polling for landing pages data:', error);
          }
        }, 5000);

      } catch (error) {
        console.error('Error fetching initial idea object:', error);
        setLoading(false);
        setIsAnalysisRunning(false);
      }
    };

    if (ideaId) {
      startLandingPagesAnalysis();
    }

    // Cleanup interval on component unmount
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [ideaId]);

  const handleTryOtherIdea = () => {
    router.push('/');
  };

  const handleRedo = async () => {
    setIsAnalysisRunning(true);
    
    try {
      // Trigger fresh analysis without waiting for response
      apiService.triggerLandingPagesAnalysis(ideaId).catch(error => {
        console.error('Error triggering landing pages analysis:', error);
      });

      // Start polling every 5 seconds for the result
      const pollInterval = setInterval(async () => {
        try {
          const updatedIdeaObject = await apiService.getIdeaObject(ideaId);
          
          if (updatedIdeaObject.landing_pages) {
            setData(updatedIdeaObject.landing_pages.data);
            setIsAnalysisRunning(false);
            clearInterval(pollInterval);
          }
        } catch (error) {
          console.error('Error polling for landing pages data:', error);
        }
      }, 5000);

    } catch (error) {
      console.error('Error starting landing pages analysis:', error);
      setIsAnalysisRunning(false);
    }
  };

  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  if (loading) {
    return (
      <IdeaPageWrapper ideaId={ideaId} currentStep="landing-pages" isLoading={true}>
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Landing Page Overview Skeleton */}
            <div className="lg:pr-8">
              <div className="h-12 bg-gray-200 rounded mb-6 animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded mb-6 animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Right side - Details Skeleton */}
            <div className="space-y-8">
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </IdeaPageWrapper>
    );
  }

  if (isAnalysisRunning) {
    return (
      <IdeaPageWrapper ideaId={ideaId} currentStep="landing-pages" isLoading={true}>
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Landing Page Overview Skeleton */}
            <div className="lg:pr-8">
              <div className="h-12 bg-gray-200 rounded mb-6 animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded mb-6 animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Right side - Details Skeleton */}
            <div className="space-y-8">
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </IdeaPageWrapper>
    );
  }

  if (!data || data.length === 0) {
    return (
      <IdeaPageWrapper ideaId={ideaId} currentStep="landing-pages">
        <main className="flex-1 p-8">
          <div className="text-center mt-20">
            <p className="text-lg text-gray-500 mb-4">Landing page analysis not found</p>
            <Button onClick={() => router.push(`/${ideaId}/monetization`)}>← Back to Monetization</Button>
          </div>
        </main>
      </IdeaPageWrapper>
    );
  }

  // Use only the first landing page as requested
  const primaryLandingPage = data[0];

  return (
    <IdeaPageWrapper ideaId={ideaId} currentStep="landing-pages">
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Landing Pages</h1>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={handleTryOtherIdea}
            >
              Try other idea
            </Button>
            <Button 
              variant="outline"
              onClick={handleRedo}
            >
              Redo
            </Button>
            <Button onClick={() => router.push(`/${ideaId}/ads-campaign`)}>
              Next step →
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                <Sparkles className="mr-2 h-4 w-4" />
                Landing Page Strategy
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {primaryLandingPage.page_name}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {primaryLandingPage.unique_selling_proposition}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Primary Objective Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="ml-3 font-semibold text-gray-900">Primary Goal</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{primaryLandingPage.primary_objective}</p>
              </div>

              {/* Target Audience Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="ml-3 font-semibold text-gray-900">Target Audience</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{primaryLandingPage.target_audience}</p>
              </div>

              {/* Monetization Strategy Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="ml-3 font-semibold text-gray-900">Strategy</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{primaryLandingPage.monetization_strategy}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                onClick={() => handleCopyPrompt(primaryLandingPage.prompt)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium shadow-lg"
              >
                {copied ? (
                  <CheckCircle className="mr-2 h-5 w-5" />
                ) : (
                  <Copy className="mr-2 h-5 w-5" />
                )}
                {copied ? 'Copied to Clipboard!' : 'Copy Landing Page Prompt'}
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                onClick={() => router.push(`/${ideaId}/landing-pages/details`)}
                className="px-8 py-3 text-lg font-medium border-2 hover:bg-gray-50"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View Full Details
              </Button>
            </div>
          </div>
        </div>

        {/* Development Tools Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Build? Choose Your Development Platform
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Copy the prompt above and paste it into any of these AI-powered development tools to start building your landing page immediately.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {/* Bolt.new */}
            <div className="group text-center p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <p className="font-medium text-gray-900">Bolt.new</p>
              <p className="text-xs text-gray-500 mt-1">StackBlitz AI</p>
            </div>

            {/* Lovable */}
            <div className="group text-center p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <p className="font-medium text-gray-900">Lovable</p>
              <p className="text-xs text-gray-500 mt-1">AI App Builder</p>
            </div>

            {/* v0 */}
            <div className="group text-center p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl">v0</span>
              </div>
              <p className="font-medium text-gray-900">v0</p>
              <p className="text-xs text-gray-500 mt-1">Vercel AI</p>
            </div>

            {/* Replit */}
            <div className="group text-center p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.5 3A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3h-9Z"/>
                </svg>
              </div>
              <p className="font-medium text-gray-900">Replit</p>
              <p className="text-xs text-gray-500 mt-1">AI Coding</p>
            </div>

            {/* Cursor */}
            <div className="group text-center p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                </svg>
              </div>
              <p className="font-medium text-gray-900">Cursor</p>
              <p className="text-xs text-gray-500 mt-1">AI Code Editor</p>
            </div>

            {/* Claude */}
            <div className="group text-center p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <p className="font-medium text-gray-900">Claude</p>
              <p className="text-xs text-gray-500 mt-1">AI Assistant</p>
            </div>
          </div>

          {copied && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full">
                <CheckCircle className="mr-2 h-5 w-5" />
                <span className="font-medium">Prompt copied! Now paste it into your preferred tool above.</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/${ideaId}/monetization`)}
          >
            ← Back to Monetization
          </Button>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={handleTryOtherIdea}
            >
              Try Another Idea
            </Button>
            <Button onClick={() => router.push(`/${ideaId}/ads-campaign`)}>
              Next: Testing →
            </Button>
          </div>
        </div>
      </main>
    </IdeaPageWrapper>
  );
}