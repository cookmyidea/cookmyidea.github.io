'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiService, type IdeaObject } from '@/services/api';
import { Button } from '@/components/ui/button';
import { IdeaPageWrapper } from '@/components/IdeaPageWrapper';
import { Lightbulb, ExternalLink, CheckCircle, Workflow, Star, Zap, Code, Database, Cloud } from 'lucide-react';

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

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                <Lightbulb className="mr-2 h-4 w-4" />
                Technical Solution
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {solution_overview.solution_name}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {solution_overview.core_functionality}
              </p>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <Button 
                size="lg"
                onClick={() => router.push(`/${ideaId}/solution/details`)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium shadow-lg"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View Technical Details
              </Button>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="ml-3 text-2xl font-bold text-gray-900">Key Features</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solution_overview.key_features.map((feature, index) => (
              <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-green-800 font-medium">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Workflow Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Workflow className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="ml-3 text-2xl font-bold text-gray-900">User Workflow</h3>
          </div>
          
          <div className="space-y-4">
            {solution_overview.user_workflow.map((step, index) => (
              <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-blue-800 font-medium leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Value Proposition & Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Value Proposition */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="ml-3 text-xl font-bold text-gray-900">Value Proposition</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{solution_overview.value_proposition}</p>
          </div>

          {/* Tech Stack Preview */}
          {data?.technical_architecture && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-gray-600" />
                </div>
                <h3 className="ml-3 text-xl font-bold text-gray-900">Tech Stack</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Code className="mr-2 h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Frontend: {data.technical_architecture.tech_stack.frontend.slice(0, 2).join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <Database className="mr-2 h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">Backend: {data.technical_architecture.tech_stack.backend.slice(0, 2).join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <Cloud className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-sm text-gray-600">AI/ML: {data.technical_architecture.tech_stack.ai_ml_components.slice(0, 2).join(', ')}</span>
                </div>
              </div>
            </div>
          )}
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