'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiService, type PainPointData, type IdeaObject } from '@/services/api';
import { Button } from '@/components/ui/button';
import { IdeaPageWrapper } from '@/components/IdeaPageWrapper';
import { AlertTriangle, ExternalLink, Target, Users, Brain, TrendingUp, CheckCircle, Lightbulb } from 'lucide-react';

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

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 rounded-2xl p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-4">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Pain Point Analysis
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {painPointData?.pain_point_title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {painPointData?.description}
              </p>
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">AI Applicability</h3>
                    <div className="text-2xl font-bold text-blue-600">{painPointData?.ai_applicability_score}/10</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${(painPointData?.ai_applicability_score || 0) * 10}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">Business Impact</h3>
                    <div className="text-2xl font-bold text-green-600">{painPointData?.business_impact_potential}/10</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${(painPointData?.business_impact_potential || 0) * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <Button 
                size="lg"
                onClick={() => router.push(`/${ideaId}/pain-points/details`)}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 text-lg font-medium shadow-lg"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View Detailed Analysis
              </Button>
            </div>
          </div>
        </div>

        {/* AI Solution Approach Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="ml-3 text-2xl font-bold text-gray-900">AI Solution Approach</h3>
          </div>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">{aiSolutionApproach?.title}</h4>
            <p className="text-gray-700 leading-relaxed text-lg">{aiSolutionApproach?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical Complexity */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Target className="mr-2 h-5 w-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Technical Complexity</span>
              </div>
              <p className="text-blue-800">{aiSolutionApproach?.technical_complexity}</p>
            </div>

            {/* Development Timeline */}
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center mb-2">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                <span className="font-semibold text-gray-900">Development Timeline</span>
              </div>
              <p className="text-green-800">{aiSolutionApproach?.development_timeline}</p>
            </div>
          </div>

          {/* AI Technologies Required */}
          {aiSolutionApproach?.ai_technologies_required && aiSolutionApproach.ai_technologies_required.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Required AI Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {aiSolutionApproach.ai_technologies_required.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Affected Stakeholders */}
        {painPointData?.affected_stakeholders && painPointData.affected_stakeholders.length > 0 && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="ml-3 text-2xl font-bold text-gray-900">Affected Stakeholders</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {painPointData.affected_stakeholders.map((stakeholder, index) => (
                <div key={index} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center">
                    <Users className="mr-3 h-4 w-4 text-orange-600 flex-shrink-0" />
                    <span className="text-orange-800 font-medium">{stakeholder}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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