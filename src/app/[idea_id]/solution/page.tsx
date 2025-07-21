'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiService, type IdeaObject } from '@/services/api';
import { Button } from '@/components/ui/button';
import { IdeaPageWrapper } from '@/components/IdeaPageWrapper';

export default function SolutionPage() {
  const [data, setData] = useState<IdeaObject['technical_solution']['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const startSolutionAnalysis = async () => {
      try {
        // First, check if analysis already exists
        const ideaObject = await apiService.getIdeaObject(ideaId);
        setLoading(false);
        
        if (ideaObject.technical_solution) {
          // Analysis already exists
          setData(ideaObject.technical_solution.data);
          return;
        }

        // If no analysis exists, start analysis
        setIsAnalysisRunning(true);
        
        // Trigger analysis without waiting for response
        apiService.triggerSolutionAnalysis(ideaId).catch(error => {
          console.error('Error triggering solution analysis:', error);
        });

        // Start polling every 5 seconds
        pollInterval = setInterval(async () => {
          try {
            const updatedIdeaObject = await apiService.getIdeaObject(ideaId);
            
            if (updatedIdeaObject.technical_solution) {
              setData(updatedIdeaObject.technical_solution.data);
              setIsAnalysisRunning(false);
              clearInterval(pollInterval);
            }
          } catch (error) {
            console.error('Error polling for solution data:', error);
          }
        }, 5000);

      } catch (error) {
        console.error('Error fetching initial idea object:', error);
        setLoading(false);
        setIsAnalysisRunning(false);
      }
    };

    if (ideaId) {
      startSolutionAnalysis();
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
      apiService.triggerSolutionAnalysis(ideaId).catch(error => {
        console.error('Error triggering solution analysis:', error);
      });

      // Start polling every 5 seconds for the result
      const pollInterval = setInterval(async () => {
        try {
          const updatedIdeaObject = await apiService.getIdeaObject(ideaId);
          
          if (updatedIdeaObject.technical_solution) {
            setData(updatedIdeaObject.technical_solution.data);
            setIsAnalysisRunning(false);
            clearInterval(pollInterval);
          }
        } catch (error) {
          console.error('Error polling for solution data:', error);
        }
      }, 5000);

    } catch (error) {
      console.error('Error starting solution analysis:', error);
      setIsAnalysisRunning(false);
    }
  };

  if (loading) {
    return (
      <IdeaPageWrapper ideaId={ideaId} currentStep="solution" isLoading={true}>
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
            {/* Left side - Solution Overview Skeleton */}
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
      <IdeaPageWrapper ideaId={ideaId} currentStep="solution" isLoading={true}>
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
            {/* Left side - Solution Overview Skeleton */}
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
      <IdeaPageWrapper ideaId={ideaId} currentStep="solution">
        <main className="flex-1 p-8">
          <div className="text-center mt-20">
            <p className="text-lg text-gray-500 mb-4">Technical solution not found</p>
            <Button onClick={() => router.push(`/${ideaId}/pain-points`)}>← Back to Pain Points</Button>
          </div>
        </main>
      </IdeaPageWrapper>
    );
  }

  const { solution_overview } = data;

  return (
    <IdeaPageWrapper ideaId={ideaId} currentStep="solution">
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Solution</h1>
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
            <Button onClick={() => router.push(`/${ideaId}/prototype`)}>
              Next step →
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Solution Overview */}
          <div className="lg:pr-8">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
                {solution_overview.solution_name}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {solution_overview.core_functionality}
              </p>

              <Button 
                variant="outline" 
                onClick={() => router.push(`/${ideaId}/solution/details`)}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Learn more
              </Button>
            </div>
          </div>

          {/* Right side - Key Information */}
          <div className="space-y-8">
            {/* User Workflow */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">User Workflow</h3>
              <div className="space-y-3">
                {solution_overview.user_workflow.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
              <div className="space-y-2">
                {solution_overview.key_features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3 mt-3 flex-shrink-0"></div>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Value Proposition */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Value Proposition</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-start mb-2">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3 mt-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-gray-900">Employers:</span>
                      <span className="text-gray-700 ml-1">
                        {solution_overview.value_proposition}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/${ideaId}/pain-points`)}
          >
            ← Back to Pain Points
          </Button>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={handleTryOtherIdea}
            >
              Try Another Idea
            </Button>
            <Button onClick={() => router.push(`/${ideaId}/prototype`)}>
              Next: Prototype →
            </Button>
          </div>
        </div>
      </main>
    </IdeaPageWrapper>
  );
}