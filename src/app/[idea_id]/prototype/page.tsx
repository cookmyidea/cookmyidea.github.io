'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiService, type IdeaObject } from '@/services/api';
import { Button } from '@/components/ui/button';
import { IdeaPageWrapper } from '@/components/IdeaPageWrapper';
import { CheckCircle } from 'lucide-react';

export default function PrototypePage() {
  const [data, setData] = useState<IdeaObject['prototype_description']['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const startPrototypeAnalysis = async () => {
      try {
        // First, check if analysis already exists
        const ideaObject = await apiService.getIdeaObject(ideaId);
        setLoading(false);
        
        if (ideaObject.prototype_description) {
          // Analysis already exists
          setData(ideaObject.prototype_description.data);
          return;
        }

        // If no analysis exists, start analysis
        setIsAnalysisRunning(true);
        
        // Trigger analysis without waiting for response
        apiService.triggerPrototypeAnalysis(ideaId).catch(error => {
          console.error('Error triggering prototype analysis:', error);
        });

        // Start polling every 5 seconds
        pollInterval = setInterval(async () => {
          try {
            const updatedIdeaObject = await apiService.getIdeaObject(ideaId);
            
            if (updatedIdeaObject.prototype_description) {
              setData(updatedIdeaObject.prototype_description.data);
              setIsAnalysisRunning(false);
              clearInterval(pollInterval);
            }
          } catch (error) {
            console.error('Error polling for prototype data:', error);
          }
        }, 5000);

      } catch (error) {
        console.error('Error fetching initial idea object:', error);
        setLoading(false);
        setIsAnalysisRunning(false);
      }
    };

    if (ideaId) {
      startPrototypeAnalysis();
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
      apiService.triggerPrototypeAnalysis(ideaId).catch(error => {
        console.error('Error triggering prototype analysis:', error);
      });

      // Start polling every 5 seconds for the result
      const pollInterval = setInterval(async () => {
        try {
          const updatedIdeaObject = await apiService.getIdeaObject(ideaId);
          
          if (updatedIdeaObject.prototype_description) {
            setData(updatedIdeaObject.prototype_description.data);
            setIsAnalysisRunning(false);
            clearInterval(pollInterval);
          }
        } catch (error) {
          console.error('Error polling for prototype data:', error);
        }
      }, 5000);

    } catch (error) {
      console.error('Error starting prototype analysis:', error);
      setIsAnalysisRunning(false);
    }
  };

  if (loading) {
    return (
      <IdeaPageWrapper ideaId={ideaId} currentStep="prototype" isLoading={true}>
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
            {/* Left side - Prototype Overview Skeleton */}
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
      <IdeaPageWrapper ideaId={ideaId} currentStep="prototype" isLoading={true}>
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
            {/* Left side - Prototype Overview Skeleton */}
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

  if (!data) {
    return (
      <IdeaPageWrapper ideaId={ideaId} currentStep="prototype">
        <main className="flex-1 p-8">
          <div className="text-center mt-20">
            <p className="text-lg text-gray-500 mb-4">Prototype description not found</p>
            <Button onClick={() => router.push(`/${ideaId}/solution`)}>← Back to Solution</Button>
          </div>
        </main>
      </IdeaPageWrapper>
    );
  }

  const { prototype_overview, features } = data;
  const mustHaveFeatures = features.filter(f => f.priority === 'must_have');

  return (
    <IdeaPageWrapper ideaId={ideaId} currentStep="prototype">
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Prototype</h1>
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
            <Button onClick={() => router.push(`/${ideaId}/monetization`)}>
              Next step →
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Prototype Overview */}
          <div className="lg:pr-8">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
                {prototype_overview.name}
              </h2>
              
              <p className="text-lg text-blue-600 font-medium mb-6">
                {prototype_overview.tagline}
              </p>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {prototype_overview.core_value_proposition}
              </p>

              <Button 
                variant="outline" 
                onClick={() => router.push(`/${ideaId}/prototype/details`)}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Learn more
              </Button>
            </div>
          </div>

          {/* Right side - Key Information */}
          <div className="space-y-8">
            {/* Target Users */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Target Users</h3>
              <div className="space-y-2">
                {prototype_overview.target_users.map((user, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3 mt-3 flex-shrink-0"></div>
                    <p className="text-gray-700">{user}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Must-Have Features */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Core Features</h3>
              <div className="space-y-3">
                {mustHaveFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="mr-3 h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">{feature.feature_name}</p>
                      <p className="text-gray-700 text-sm">{feature.user_benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Use Case */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Primary Use Case</h3>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700">{prototype_overview.primary_use_case}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/${ideaId}/solution`)}
          >
            ← Back to Solution
          </Button>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={handleTryOtherIdea}
            >
              Try Another Idea
            </Button>
            <Button onClick={() => router.push(`/${ideaId}/monetization`)}>
              Next: Monetization →
            </Button>
          </div>
        </div>
      </main>
    </IdeaPageWrapper>
  );
}