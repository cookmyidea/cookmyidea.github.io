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
          <div>
            <button 
              onClick={handleTryOtherIdea}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg mr-2 cursor-pointer"
            >
              Try other idea
            </button>
            <button 
              onClick={handleRedo}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg mr-2 cursor-pointer"
            >
              Redo
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-lg cursor-pointer">Next step →</button>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Main pain point</h2>
            <h3 className="text-lg font-medium text-gray-800 mb-4">{painPointData?.pain_point_title}</h3>
            <div className="text-gray-600">{painPointData?.description}</div>
            <Button 
              variant="link" 
              className="mt-4 p-0 h-auto"
              onClick={() => router.push(`/${ideaId}/pain-points/details`)}
            >
              View pain point details →
            </Button>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">AI Solution</h2>
            <p className="text-gray-600 mb-4">{aiSolutionApproach?.description}</p>
            <div className="flex items-center justify-between mb-2">
              <span>AI Applicability Score</span>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-green-200 rounded-full mr-2">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: `${(painPointData?.ai_applicability_score || 0) * 10}%` }}></div>
                </div>
                <span>{painPointData?.ai_applicability_score}/10 High</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Business Impact Potential</span>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-green-200 rounded-full mr-2">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: `${(painPointData?.business_impact_potential || 0) * 10}%` }}></div>
                </div>
                <span>{painPointData?.business_impact_potential}/10 High</span>
              </div>
            </div>

            <Button 
              variant="link" 
              className="mt-4 p-0 h-auto"
              onClick={() => router.push(`/${ideaId}/pain-points/details`)}
            >
              View solution details →
            </Button>
          </div>
        </div>
      </main>
    </IdeaPageWrapper>
  );
}