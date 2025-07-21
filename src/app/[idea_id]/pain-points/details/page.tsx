'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { apiService, type IdeaObject } from '@/services/api';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Lightbulb, 
  TrendingUp, 
  TrendingDown, 
  Target,
  Users,
  Zap,
  BarChart3,
  Clock,
  Shield
} from 'lucide-react';

export default function PainPointDetailsPage() {
  const [analysisData, setAnalysisData] = useState<IdeaObject['ai_pain_point_analysis']['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const ideaObject = await apiService.getIdeaObject(ideaId);
        
        if (ideaObject.ai_pain_point_analysis) {
          setAnalysisData(ideaObject.ai_pain_point_analysis.data);
        }
      } catch (error) {
        console.error('Error fetching pain point analysis:', error);
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
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Skeleton */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div>
                  <div className="h-6 w-40 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Pain Point Overview Skeleton */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-2 h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-2 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Additional sections skeleton */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-4">Pain point analysis not found</p>
          <Button onClick={() => router.push(`/${ideaId}/pain-points`)}>← Back to Pain Points</Button>
        </div>
      </div>
    );
  }

  const { selected_pain_point, ai_solution_approach, competitive_analysis, success_metrics, risk_assessment } = analysisData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push(`/${ideaId}/pain-points`)}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Pain Points
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pain Point Analysis Details</h1>
                <p className="text-gray-600">{selected_pain_point?.pain_point_title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Pain Point Overview */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              <h2 className="text-xl font-semibold">Pain Point Overview</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">{selected_pain_point?.pain_point_title}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{selected_pain_point?.description}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{selected_pain_point?.selection_rationale}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">AI Applicability Score</span>
                    <span className={`font-bold ${getScoreColor(selected_pain_point?.ai_applicability_score || 0)}`}>
                      {selected_pain_point?.ai_applicability_score}/10
                    </span>
                  </div>
                  <Progress 
                    value={(selected_pain_point?.ai_applicability_score || 0) * 10} 
                    className={`w-full ${getProgressColor(selected_pain_point?.ai_applicability_score || 0)}`} 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Business Impact Potential</span>
                    <span className={`font-bold ${getScoreColor(selected_pain_point?.business_impact_potential || 0)}`}>
                      {selected_pain_point?.business_impact_potential}/10
                    </span>
                  </div>
                  <Progress 
                    value={(selected_pain_point?.business_impact_potential || 0) * 10} 
                    className={`w-full ${getProgressColor(selected_pain_point?.business_impact_potential || 0)}`} 
                  />
                </div>
              </div>
            </div>

            {/* Affected Stakeholders */}
            {selected_pain_point?.affected_stakeholders && (
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <Users className="mr-2 h-4 w-4 text-blue-500" />
                  <h4 className="font-medium text-gray-800">Affected Stakeholders</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected_pain_point.affected_stakeholders.map((stakeholder, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {stakeholder}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Current Solution Gaps */}
            {selected_pain_point?.current_solution_gaps && (
              <div>
                <div className="flex items-center mb-3">
                  <TrendingDown className="mr-2 h-4 w-4 text-orange-500" />
                  <h4 className="font-medium text-gray-800">Current Solution Gaps</h4>
                </div>
                <ul className="space-y-2">
                  {selected_pain_point.current_solution_gaps.map((gap, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* AI Solution Approach */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
              <h2 className="text-xl font-semibold">AI Solution Approach</h2>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">{ai_solution_approach?.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{ai_solution_approach?.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-3">
                    <Zap className="mr-2 h-4 w-4 text-purple-500" />
                    <h4 className="font-medium text-gray-800">Required AI Technologies</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ai_solution_approach?.ai_technologies_required?.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-3">
                    <Target className="mr-2 h-4 w-4 text-green-500" />
                    <h4 className="font-medium text-gray-800">Model Types</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ai_solution_approach?.model_types?.map((model, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Technical Complexity</h4>
                  <p className="text-gray-600 text-sm">{ai_solution_approach?.technical_complexity}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Development Timeline</h4>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="text-gray-600 text-sm">{ai_solution_approach?.development_timeline}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Requirements */}
            {ai_solution_approach?.data_requirements && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Data Requirements</h4>
                <ul className="space-y-1">
                  {ai_solution_approach.data_requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Integration Challenges */}
            {ai_solution_approach?.integration_challenges && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Integration Challenges</h4>
                <ul className="space-y-1">
                  {ai_solution_approach.integration_challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Competitive Analysis */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <BarChart3 className="mr-2 h-5 w-5 text-indigo-500" />
              <h2 className="text-xl font-semibold">Competitive Analysis</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Existing AI Solutions</h4>
                <div className="space-y-2 mb-4">
                  {competitive_analysis?.existing_ai_solutions?.map((solution, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 text-sm">{solution}</span>
                    </div>
                  ))}
                </div>
                
                <h4 className="font-medium text-gray-800 mb-3">Competitive Gaps</h4>
                <ul className="space-y-2">
                  {competitive_analysis?.competitive_gaps?.map((gap, index) => (
                    <li key={index} className="flex items-start">
                      <TrendingUp className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Differentiation Opportunities</h4>
                <ul className="space-y-2 mb-4">
                  {competitive_analysis?.differentiation_opportunities?.map((opportunity, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{opportunity}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-medium text-indigo-900 mb-2">Sustainable Advantage Potential</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-indigo-800">Advantage Score</span>
                    <span className={`font-bold ${getScoreColor(competitive_analysis?.sustainable_advantage_potential || 0)}`}>
                      {competitive_analysis?.sustainable_advantage_potential}/10
                    </span>
                  </div>
                  <Progress 
                    value={(competitive_analysis?.sustainable_advantage_potential || 0) * 10} 
                    className={`w-full ${getProgressColor(competitive_analysis?.sustainable_advantage_potential || 0)}`} 
                  />
                  <p className="text-sm text-indigo-700 mt-2">{competitive_analysis?.market_positioning}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          {success_metrics && success_metrics.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <Target className="mr-2 h-5 w-5 text-green-500" />
                <h2 className="text-xl font-semibold">Success Metrics</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {success_metrics.map((metric, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">{metric.metric_name}</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Measurement:</strong> {metric.measurement_method}</p>
                      <p><strong>Target:</strong> {metric.target_improvement}</p>
                      <p><strong>Baseline:</strong> {metric.baseline_current_state}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Risk Assessment */}
          {risk_assessment && risk_assessment.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <Shield className="mr-2 h-5 w-5 text-red-500" />
                <h2 className="text-xl font-semibold">Risk Assessment</h2>
              </div>
              
              <div className="space-y-4">
                {risk_assessment.map((risk, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800">{risk.risk_type}</h4>
                      <div className="flex space-x-2">
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                          {risk.probability}
                        </span>
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                          {risk.impact}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Mitigation:</strong> {risk.mitigation_strategy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => router.push(`/${ideaId}/pain-points`)}
              >
                ← Back to Pain Points
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}