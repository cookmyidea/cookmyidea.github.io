'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiService, type PainPointData, type IdeaObject } from '@/services/api';
import { Button } from '@/components/ui/button';
import { IdeaPageWrapper } from '@/components/IdeaPageWrapper';

export default function PainPointsPage() {
  const [data, setData] = useState<IdeaObject['ai_pain_point_analysis']['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const startPainPointAnalysis = async () => {
      try {
        // First, check if analysis already exists
        const ideaObject = await apiService.getIdeaObject(ideaId);
        setLoading(false);
        
        if (ideaObject.ai_pain_point_analysis) {
          // Analysis already exists
          setData(ideaObject.ai_pain_point_analysis.data);
          return;
        }

        // If no analysis exists, show creative loading and start analysis
        setIsAnalysisRunning(true);
        
        // Trigger analysis without waiting for response
        apiService.triggerPainPointAnalysis(ideaId).catch(error => {
          console.error('Error triggering pain point analysis:', error);
        });

        // Start polling every 5 seconds
        pollInterval = setInterval(async () => {
          try {
            const updatedIdeaObject = await apiService.getIdeaObject(ideaId);
            
            if (updatedIdeaObject.ai_pain_point_analysis) {
              setData(updatedIdeaObject.ai_pain_point_analysis.data);
              setIsAnalysisRunning(false);
              clearInterval(pollInterval);
            }
          } catch (error) {
            console.error('Error polling for pain point data:', error);
          }
        }, 5000);

      } catch (error) {
        console.error('Error fetching initial idea object:', error);
        setLoading(false);
        setIsAnalysisRunning(false);
      }
    };

    if (ideaId) {
      startPainPointAnalysis();
    }

    // Cleanup interval on component unmount
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [ideaId]);

  if (loading) {
    return (
      <IdeaPageWrapper ideaId={ideaId} currentStep="pain-points" isLoading={true}>

        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-5 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-6 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
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
      <IdeaPageWrapper ideaId={ideaId} currentStep="pain-points" isLoading={true}>

        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-5 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-6 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </IdeaPageWrapper>
    );
  }

  const painPointData = data?.selected_pain_point;
  const aiSolutionApproach = data?.ai_solution_approach;

  const handleTryOtherIdea = () => {
    router.push('/');
  };

  const handleRedo = async () => {
    setIsAnalysisRunning(true);
    
    try {
      // Trigger fresh analysis without waiting for response
      apiService.triggerPainPointAnalysis(ideaId).catch(error => {
        console.error('Error triggering pain point analysis:', error);
      });

      // Start polling every 5 seconds for the result
      const pollInterval = setInterval(async () => {
        try {
          const updatedIdeaObject = await apiService.getIdeaObject(ideaId);
          
          if (updatedIdeaObject.ai_pain_point_analysis) {
            setData(updatedIdeaObject.ai_pain_point_analysis.data);
            setIsAnalysisRunning(false);
            clearInterval(pollInterval);
          }
        } catch (error) {
          console.error('Error polling for pain point data:', error);
        }
      }, 5000);

    } catch (error) {
      console.error('Error starting pain point analysis:', error);
      setIsAnalysisRunning(false);
    }
  };


  return (
    <IdeaPageWrapper ideaId={ideaId} currentStep="pain-points">
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Pain Point Analysis</h1>
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
            <Button onClick={() => router.push(`/${ideaId}/solution`)}>
              Solution →
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Main Pain Point */}
          <div className="lg:pr-8">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
                {painPointData?.pain_point_title}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {painPointData?.description}
              </p>

              <Button 
                variant="outline" 
                onClick={() => router.push(`/${ideaId}/pain-points/details`)}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Learn more
              </Button>
            </div>
          </div>

          {/* Right side - Key Information */}
          <div className="space-y-8">
            {/* AI Solution Approach */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Solution Approach</h3>
              <p className="text-gray-700 leading-relaxed mb-6">{aiSolutionApproach?.description}</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">AI Applicability Score</span>
                    <span className="font-semibold text-gray-900">{painPointData?.ai_applicability_score}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(painPointData?.ai_applicability_score || 0) * 10}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Business Impact Potential</span>
                    <span className="font-semibold text-gray-900">{painPointData?.business_impact_potential}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(painPointData?.business_impact_potential || 0) * 10}%` }}
                    ></div>
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
            onClick={() => router.push(`/${ideaId}/evaluation`)}
          >
            ← Back to Evaluation
          </Button>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={handleTryOtherIdea}
            >
              Try Another Idea
            </Button>
            <Button onClick={() => router.push(`/${ideaId}/solution`)}>
              Next: Solution →
            </Button>
          </div>
        </div>
      </main>
    </IdeaPageWrapper>
  );
}