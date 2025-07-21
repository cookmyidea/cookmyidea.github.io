'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiService, type IdeaObject } from '@/services/api';
import { Button } from '@/components/ui/button';
import { IdeaPageWrapper } from '@/components/IdeaPageWrapper';
import { DollarSign, Users, TrendingUp } from 'lucide-react';

export default function MonetizationPage() {
  const [data, setData] = useState<IdeaObject['monetization_strategies']['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const startMonetizationAnalysis = async () => {
      try {
        // First, check if analysis already exists
        const ideaObject = await apiService.getIdeaObject(ideaId);
        setLoading(false);
        
        if (ideaObject.monetization_strategies) {
          // Analysis already exists
          setData(ideaObject.monetization_strategies.data);
          return;
        }

        // If no analysis exists, start analysis
        setIsAnalysisRunning(true);
        
        // Trigger analysis without waiting for response
        apiService.triggerMonetizationAnalysis(ideaId).catch(error => {
          console.error('Error triggering monetization analysis:', error);
        });

        // Start polling every 5 seconds
        pollInterval = setInterval(async () => {
          try {
            const updatedIdeaObject = await apiService.getIdeaObject(ideaId);
            
            if (updatedIdeaObject.monetization_strategies) {
              setData(updatedIdeaObject.monetization_strategies.data);
              setIsAnalysisRunning(false);
              clearInterval(pollInterval);
            }
          } catch (error) {
            console.error('Error polling for monetization data:', error);
          }
        }, 5000);

      } catch (error) {
        console.error('Error fetching initial idea object:', error);
        setLoading(false);
        setIsAnalysisRunning(false);
      }
    };

    if (ideaId) {
      startMonetizationAnalysis();
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
      apiService.triggerMonetizationAnalysis(ideaId).catch(error => {
        console.error('Error triggering monetization analysis:', error);
      });

      // Start polling every 5 seconds for the result
      const pollInterval = setInterval(async () => {
        try {
          const updatedIdeaObject = await apiService.getIdeaObject(ideaId);
          
          if (updatedIdeaObject.monetization_strategies) {
            setData(updatedIdeaObject.monetization_strategies.data);
            setIsAnalysisRunning(false);
            clearInterval(pollInterval);
          }
        } catch (error) {
          console.error('Error polling for monetization data:', error);
        }
      }, 5000);

    } catch (error) {
      console.error('Error starting monetization analysis:', error);
      setIsAnalysisRunning(false);
    }
  };

  if (loading) {
    return (
      <IdeaPageWrapper ideaId={ideaId} currentStep="monetization" isLoading={true}>
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
            {/* Left side - Monetization Overview Skeleton */}
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
      <IdeaPageWrapper ideaId={ideaId} currentStep="monetization" isLoading={true}>
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
            {/* Left side - Monetization Overview Skeleton */}
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
      <IdeaPageWrapper ideaId={ideaId} currentStep="monetization">
        <main className="flex-1 p-8">
          <div className="text-center mt-20">
            <p className="text-lg text-gray-500 mb-4">Monetization strategies not found</p>
            <Button onClick={() => router.push(`/${ideaId}/prototype`)}>← Back to Prototype</Button>
          </div>
        </main>
      </IdeaPageWrapper>
    );
  }

  // Use only the first strategy as requested
  const primaryStrategy = data[0];

  return (
    <IdeaPageWrapper ideaId={ideaId} currentStep="monetization">
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Monetization</h1>
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
            <Button onClick={() => router.push(`/${ideaId}/landing-pages`)}>
              Next step →
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Strategy Overview */}
          <div className="lg:pr-8">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
                {primaryStrategy.strategy_name}
              </h2>
              
              <p className="text-lg text-green-600 font-medium mb-6">
                {primaryStrategy.model_type.charAt(0).toUpperCase() + primaryStrategy.model_type.slice(1)} Model
              </p>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {primaryStrategy.value_proposition}
              </p>

              <Button 
                variant="outline" 
                onClick={() => router.push(`/${ideaId}/monetization/details`)}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Learn more
              </Button>
            </div>
          </div>

          {/* Right side - Key Information */}
          <div className="space-y-8">
            {/* Target Customer */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Target Customer</h3>
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <Users className="mr-3 h-5 w-5 text-blue-600" />
                <p className="text-gray-800 font-medium">{primaryStrategy.target_customer}</p>
              </div>
            </div>

            {/* Pricing Structure */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing Tiers</h3>
              <div className="space-y-3">
                {primaryStrategy.pricing_structure.pricing_tiers.map((tier, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="mr-3 h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">{tier}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Projections */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Revenue Projections</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-900">Year 1</span>
                  <span className="font-bold text-green-800">{primaryStrategy.revenue_projections.year_1}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-900">Year 2</span>
                  <span className="font-bold text-green-800">{primaryStrategy.revenue_projections.year_2}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-900">Year 3</span>
                  <span className="font-bold text-green-800">{primaryStrategy.revenue_projections.year_3}</span>
                </div>
              </div>
            </div>

            {/* Competitive Advantage */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Competitive Benchmarking</h3>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <TrendingUp className="mr-3 h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-blue-800 font-medium">{primaryStrategy.competitive_benchmarking}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/${ideaId}/prototype`)}
          >
            ← Back to Prototype
          </Button>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={handleTryOtherIdea}
            >
              Try Another Idea
            </Button>
            <Button onClick={() => router.push(`/${ideaId}/landing-pages`)}>
              Next: Landing Pages →
            </Button>
          </div>
        </div>
      </main>
    </IdeaPageWrapper>
  );
}