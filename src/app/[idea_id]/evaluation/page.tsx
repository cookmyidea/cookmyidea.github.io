"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { apiService, type IdeaObject } from '@/services/api';
import { CreativeLoadingScreen } from '@/components/CreativeLoadingScreen';

export default function EvaluationPage() {
  const [analysisData, setAnalysisData] = useState<IdeaObject['initial_analyze']['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        // First, try to get the idea object
        const ideaObject = await apiService.getIdeaObject(ideaId);
        setIsLoading(false);
        
        // Check if initial_analyze exists
        if (ideaObject.initial_analyze) {
          setAnalysisData(ideaObject.initial_analyze.data);
        } else {
          // If no initial_analyze, show creative loading and run the analysis
          setIsAnalysisRunning(true);
          const data = await apiService.triggerInitialAnalyse(ideaId);
          setAnalysisData(data.initial_analyze.data);
          setIsAnalysisRunning(false);
        }
      } catch (error) {
        console.error('Error fetching analysis:', error);
        setIsLoading(false);
        setIsAnalysisRunning(false);
      }
    };

    if (ideaId) {
      fetchAnalysis();
    }
  }, [ideaId]);

  const handleTryAnotherIdea = () => {
    router.push('/');
  };

  const handleGiveItATry = async () => {
      router.push(`/${ideaId}/pain-points`);
  };

  const getProgressColor = (score: number) => {
    if (score <= 3) return 'bg-red-100 [&>div]:bg-red-500';
    if (score <= 6) return 'bg-yellow-100 [&>div]:bg-yellow-400';
    return 'bg-green-100 [&>div]:bg-green-500';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Business Idea Title Skeleton */}
            <div className="lg:pr-16">
              <div className="h-12 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-8 animate-pulse"></div>
              <div className="flex space-x-4">
                <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>

            {/* Right side - Progress Bars Skeleton */}
            <div>
              <div className="space-y-10">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                      <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAnalysisRunning) {
    return <CreativeLoadingScreen />;
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-4">Analysis not found</p>
          <Button onClick={handleTryAnotherIdea}>← Back to home</Button>
        </div>
      </div>
    );
  }

  const { business_idea, analysis } = analysisData;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Business Idea Title */}
          <div className="lg:pr-16">
            <h1 className="text-5xl font-bold leading-tight mb-8">
              {business_idea}
            </h1>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleTryAnotherIdea}>← Try other idea</Button>
              <Button variant="outline" onClick={handleGiveItATry}>Give it to try →</Button>
            </div>
          </div>

          {/* Right side - Progress Bars */}
          <div>
            <div className="space-y-10">
              {Object.entries(analysis).map(([key, value]) => {
                // Enhanced styling for technical difficulty and market research
                const isEnhanced = key === 'technical_difficulty' || key === 'market_research';
                
                if (isEnhanced) {
                  return (
                    <div key={key} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold capitalize text-blue-800">
                          {key.replace(/_/g, ' ')}
                        </h2>
                        <div className="flex items-center space-x-2">
                          <span className={`text-2xl font-bold ${
                            value.score <= 3 ? 'text-red-500' : value.score <= 6 ? 'text-yellow-500' : 'text-green-500'
                          }`}>
                            {value.score}/10
                          </span>
                          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {value.assessment}
                          </span>
                        </div>
                      </div>
                      <Progress value={value.score * 10} className={`w-full mb-4 ${getProgressColor(value.score)}`} />
                      <p className="text-gray-700 leading-relaxed mb-4">{value.summary}</p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-blue-600 hover:text-blue-800"
                        onClick={() => router.push(`/${ideaId}/evaluation/details`)}
                      >
                        View {key === 'technical_difficulty' ? 'technical details' : 'market analysis'} →
                      </Button>
                    </div>
                  );
                }
                
                // Standard styling for other categories
                return (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-semibold capitalize">{key.replace(/_/g, ' ')}</h2>
                      <span className="text-sm font-medium text-gray-500">{value.score}/10 {value.assessment}</span>
                    </div>
                    <Progress value={value.score * 10} className={`w-full ${getProgressColor(value.score)}`} />
                    <p className="mt-4 text-gray-600">{value.summary}</p>
                    <Button 
                      variant="link" 
                      className="mt-2 p-0 h-auto"
                      onClick={() => router.push(`/${ideaId}/evaluation/details`)}
                    >
                      Learn more
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="flex space-x-4 mt-12 items-center">
              <Button variant="outline" onClick={handleTryAnotherIdea}>← Try other idea</Button>
              <Button>Improve it</Button>
              <div>or</div>
              <Button variant="default" onClick={handleGiveItATry}>Give it to try →</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}