'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiService, type IdeaObject } from '@/services/api';
import { Button } from '@/components/ui/button';
import { IdeaPageWrapper } from '@/components/IdeaPageWrapper';
import { DollarSign, Users, TrendingUp, ExternalLink, Sparkles, Target, BarChart3, CheckCircle } from 'lucide-react';

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

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 rounded-2xl p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                <Sparkles className="mr-2 h-4 w-4" />
                Monetization Strategy
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {primaryStrategy.strategy_name}
              </h2>
              <div className="inline-block px-4 py-2 bg-green-600 text-white rounded-full text-lg font-semibold mb-4">
                {primaryStrategy.model_type.charAt(0).toUpperCase() + primaryStrategy.model_type.slice(1)} Model
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {primaryStrategy.value_proposition}
              </p>
            </div>

            {/* Revenue Projections Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{primaryStrategy.revenue_projections.year_1}</div>
                <div className="text-sm text-green-800 font-medium">Year 1 Revenue</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{primaryStrategy.revenue_projections.year_2}</div>
                <div className="text-sm text-blue-800 font-medium">Year 2 Revenue</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{primaryStrategy.revenue_projections.year_3}</div>
                <div className="text-sm text-purple-800 font-medium">Year 3 Revenue</div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <Button 
                size="lg"
                onClick={() => router.push(`/${ideaId}/monetization/details`)}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-medium shadow-lg"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View Detailed Analysis
              </Button>
            </div>
          </div>
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Target Customer */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="ml-3 text-xl font-bold text-gray-900">Target Customer</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{primaryStrategy.target_customer}</p>
          </div>

          {/* Competitive Advantage */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="ml-3 text-xl font-bold text-gray-900">Competitive Edge</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{primaryStrategy.competitive_benchmarking}</p>
          </div>
        </div>

        {/* Pricing Structure */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="ml-3 text-2xl font-bold text-gray-900">Pricing Structure</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {primaryStrategy.pricing_structure.pricing_tiers.map((tier, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 font-medium">{tier}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Target className="mr-2 h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Pricing Model:</span>
            </div>
            <p className="text-gray-700">{primaryStrategy.pricing_structure.pricing_model}</p>
            <div className="mt-2 flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">
                Billing: {primaryStrategy.pricing_structure.billing_frequency}
              </span>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                primaryStrategy.pricing_structure.free_tier 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {primaryStrategy.pricing_structure.free_tier ? 'Free Tier Available' : 'No Free Tier'}
              </span>
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