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
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        // First, try to get the idea object
        const ideaObject = await apiService.getIdeaObject(ideaId);
        
        // Check if initial_analyze exists
        if (ideaObject.initial_analyze) {
          setAnalysisData(ideaObject.initial_analyze.data);
        } else {
          // If no initial_analyze, run the analysis
          const data = await apiService.triggerInitialAnalyse(ideaId);
          setAnalysisData(data.initial_analyze.data);
        }
      } catch (error) {
        console.error('Error fetching analysis:', error);
      } finally {
        setIsLoading(false);
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
          <div className="lg:pr-16">
            <h1 className="text-5xl font-bold leading-tight mb-8">
              {business_idea}
            </h1>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleTryAnotherIdea}>← Try other idea</Button>
              <Button variant="outline" onClick={handleGiveItATry}>Give it to try →</Button>
            </div>
          </div>
          <div>
            <div className="space-y-10">
              {Object.entries(analysis).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold capitalize">{key.replace(/_/g, ' ')}</h2>
                    <span className="text-sm font-medium text-gray-500">{value.score}/10 {value.assessment}</span>
                  </div>
                  <Progress value={value.score * 10} className={`w-full ${getProgressColor(value.score)}`} />
                  <p className="mt-4 text-gray-600">{value.summary}</p>
                  <a href="#" className="text-blue-500 hover:underline mt-2 inline-block">Learn more</a>
                </div>
              ))}
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