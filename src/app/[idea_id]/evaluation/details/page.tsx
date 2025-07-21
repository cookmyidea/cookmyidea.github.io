'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreativeLoadingScreen } from '@/components/CreativeLoadingScreen';
import { apiService, type IdeaObject } from '@/services/api';
import { ArrowLeft, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Star } from 'lucide-react';

export default function EvaluationDetailsPage() {
  const [analysisData, setAnalysisData] = useState<IdeaObject['initial_analyze']['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const ideaObject = await apiService.getIdeaObject(ideaId);
        
        if (ideaObject.initial_analyze) {
          setAnalysisData(ideaObject.initial_analyze.data);
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

  const getScoreColor = (score: number) => {
    if (score <= 3) return 'text-red-500';
    if (score <= 6) return 'text-yellow-500';
    return 'text-green-500';
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-4">Analysis details not found</p>
          <Button onClick={() => router.push(`/${ideaId}/evaluation`)}>← Back to evaluation</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push(`/${ideaId}/evaluation`)}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Evaluation
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Detailed Analysis</h1>
                <p className="text-gray-600">{analysisData.business_idea}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{analysisData.final_verdict?.score}</div>
              <div className="text-sm text-gray-500">{analysisData.final_verdict?.assestment}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Overall Assessment */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Star className="mr-2 h-5 w-5 text-yellow-500" />
              <h2 className="text-xl font-semibold">Overall Assessment</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{analysisData.overall_assessment?.viability_score}/10</div>
                <div className="text-sm text-gray-600">Viability Score</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-lg font-semibold text-green-600">{analysisData.overall_assessment?.assessment}</div>
                <div className="text-sm text-gray-600">Assessment</div>
              </div>
              <div className="col-span-1 md:col-span-1 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-600 mb-2">Recommendation</div>
                <div className="text-sm text-gray-800">{analysisData.overall_assessment?.recommendation}</div>
              </div>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h4 className="font-medium text-indigo-900 mb-2">Final Verdict</h4>
              <p className="text-indigo-800 text-sm">{analysisData.final_verdict?.description}</p>
            </div>
          </div>

          {/* Analysis Categories */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Detailed Analysis</h2>
            <div className="space-y-6">
              {Object.entries(analysisData.analysis).map(([key, value]) => (
                <div key={key} className="border-l-4 border-blue-200 pl-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold capitalize">{key.replace(/_/g, ' ')}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-lg font-bold ${getScoreColor(value.score)}`}>
                        {value.score}/10
                      </span>
                      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {value.assessment}
                      </span>
                    </div>
                  </div>
                  <Progress value={value.score * 10} className={`w-full mb-4 ${getProgressColor(value.score)}`} />
                  <p className="text-gray-700 leading-relaxed">{value.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths and Challenges */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Strengths */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                <h2 className="text-xl font-semibold text-green-700">Strengths</h2>
              </div>
              <div className="space-y-4">
                {analysisData.strengths?.map((strength, index) => (
                  <div key={index} className="p-4 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-green-800">{strength.name}</h4>
                      <div className="flex items-center">
                        <CheckCircle className="mr-1 h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-semibold">{strength.score}/10</span>
                      </div>
                    </div>
                    <p className="text-green-700 text-sm">{strength.analysis}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <TrendingDown className="mr-2 h-5 w-5 text-red-500" />
                <h2 className="text-xl font-semibold text-red-700">Challenges</h2>
              </div>
              <div className="space-y-4">
                {analysisData.challenges?.map((challenge, index) => (
                  <div key={index} className="p-4 bg-red-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-red-800">{challenge.name}</h4>
                      <div className="flex items-center">
                        <AlertCircle className="mr-1 h-4 w-4 text-red-600" />
                        <span className="text-red-600 font-semibold">{challenge.score}/10</span>
                      </div>
                    </div>
                    <p className="text-red-700 text-sm">{challenge.analysis}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => router.push(`/${ideaId}/evaluation`)}
              >
                ← Back to Evaluation
              </Button>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/')}
                >
                  Try Another Idea
                </Button>
                <Button onClick={() => router.push(`/${ideaId}/pain-points`)}>
                  View Pain Points →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}