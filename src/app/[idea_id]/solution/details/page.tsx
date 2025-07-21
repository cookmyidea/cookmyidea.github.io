'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiService, type IdeaObject } from '@/services/api';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  Lightbulb,
  Code,
  Database,
  Brain,
  Users,
  DollarSign,
  Calendar,
  Zap,
  Server,
  Workflow,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function SolutionDetailsPage() {
  const [data, setData] = useState<IdeaObject['technical_solution']['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const ideaObject = await apiService.getIdeaObject(ideaId);
        
        if (ideaObject.technical_solution) {
          setData(ideaObject.technical_solution.data);
        }
      } catch (error) {
        console.error('Error fetching solution analysis:', error);
      } finally {
        setLoading(false);
      }
    };

    if (ideaId) {
      fetchAnalysis();
    }
  }, [ideaId]);

  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Skeleton */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div>
                  <div className="h-6 w-48 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Solution sections skeleton */}
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="h-6 w-40 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-4">Solution details not found</p>
          <Button onClick={() => router.push(`/${ideaId}/solution`)}>← Back to Solution</Button>
        </div>
      </div>
    );
  }

  const { solution_overview, technical_architecture, ai_implementation, development_plan, scalability_considerations } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push(`/${ideaId}/solution`)}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Solution
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Solution Details</h1>
                <p className="text-gray-600">{solution_overview.solution_name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Solution Overview */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Lightbulb className="mr-3 h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Solution Overview</h2>
            </div>
            
            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">{solution_overview.core_functionality}</p>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Value Proposition</h4>
                <p className="text-blue-800">{solution_overview.value_proposition}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Workflow */}
              <div>
                <div className="flex items-center mb-3">
                  <Workflow className="mr-2 h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">User Workflow</h3>
                </div>
                <div className="space-y-2">
                  {solution_overview.user_workflow.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="mr-3 h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <div className="flex items-center mb-3">
                  <Zap className="mr-2 h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
                </div>
                <div className="space-y-2">
                  {solution_overview.key_features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Architecture */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Code className="mr-3 h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900">Technical Architecture</h2>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Technology Stack</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(technical_architecture.tech_stack).map(([category, technologies]) => (
                  <div key={category} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2 capitalize">{category.replace(/_/g, ' ')}</h4>
                    <div className="space-y-1">
                      {technologies.map((tech, index) => (
                        <span key={index} className="inline-block bg-white text-gray-700 text-sm px-2 py-1 rounded mr-1 mb-1">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Components */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Components</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {technical_architecture.system_components.map((component, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{component.component_name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(component.complexity)}`}>
                        {component.complexity}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{component.purpose}</p>
                    <div className="mb-3">
                      <span className="text-xs font-medium text-gray-500">Technology:</span>
                      <span className="ml-1 text-sm text-gray-700">{component.technology}</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">Dependencies:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {component.dependencies.map((dep, depIndex) => (
                          <span key={depIndex} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {dep}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Flow */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Database className="mr-2 h-5 w-5 text-indigo-500" />
                <h3 className="text-lg font-semibold text-gray-900">Data Flow</h3>
              </div>
              <div className="space-y-2">
                {technical_architecture.data_flow.map((flow, index) => (
                  <div key={index} className="p-3 bg-indigo-50 rounded-lg">
                    <code className="text-indigo-800 text-sm">{flow}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration Points */}
            <div>
              <div className="flex items-center mb-3">
                <Server className="mr-2 h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900">Integration Points</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {technical_architecture.integration_points.map((integration, index) => (
                  <span key={index} className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    {integration}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Implementation */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Brain className="mr-3 h-6 w-6 text-pink-500" />
              <h2 className="text-2xl font-bold text-gray-900">AI Implementation</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Model Selection & Training</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-pink-50 rounded-lg">
                    <h4 className="font-medium text-pink-900 mb-2">Model Selection</h4>
                    <p className="text-pink-800 text-sm">{ai_implementation.model_selection}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Training Approach</h4>
                    <p className="text-purple-800 text-sm">{ai_implementation.training_approach}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Inference Method</h4>
                    <p className="text-blue-800 text-sm">{ai_implementation.inference_method}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Requirements</h3>
                <div className="space-y-3">
                  {ai_implementation.performance_requirements.map((req, index) => (
                    <div key={index} className="flex items-start">
                      <Target className="mr-2 h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{req}</span>
                    </div>
                  ))}
                </div>

                <h4 className="font-semibold text-gray-900 mt-6 mb-3">Accuracy Targets</h4>
                <div className="space-y-3">
                  {ai_implementation.accuracy_targets.map((target, index) => (
                    <div key={index} className="flex items-start">
                      <TrendingUp className="mr-2 h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{target}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Pipeline */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Pipeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {ai_implementation.data_pipeline.map((step, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Development Plan */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Calendar className="mr-3 h-6 w-6 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900">Development Plan</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Timeline and Team */}
              <div>
                <div className="flex items-center mb-4">
                  <Clock className="mr-2 h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Timeline: {development_plan.timeline}</h3>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Users className="mr-2 h-5 w-5 text-purple-500" />
                    <h4 className="font-semibold text-gray-900">Team Requirements</h4>
                  </div>
                  <div className="space-y-2">
                    {development_plan.team_requirements.map((role, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        <span className="text-gray-700">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estimated Costs */}
              <div>
                <div className="flex items-center mb-4">
                  <DollarSign className="mr-2 h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Estimated Costs</h3>
                </div>
                <div className="space-y-3">
                  {Object.entries(development_plan.estimated_costs).map(([category, cost]) => (
                    <div key={category} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-900 capitalize">{category.replace(/_/g, ' ')}</span>
                      <span className="text-green-800 font-semibold">{cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Development Phases */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Phases</h3>
              <div className="space-y-6">
                {development_plan.development_phases.map((phase, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">{phase.phase_name}</h4>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{phase.duration}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Deliverables</h5>
                        <ul className="space-y-1">
                          {phase.deliverables.map((deliverable, deliverableIndex) => (
                            <li key={deliverableIndex} className="flex items-start">
                              <CheckCircle className="mr-2 h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Success Criteria</h5>
                        <ul className="space-y-1">
                          {phase.success_criteria.map((criteria, criteriaIndex) => (
                            <li key={criteriaIndex} className="flex items-start">
                              <Target className="mr-2 h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Resource Requirements</h5>
                        <div className="p-2 bg-yellow-50 rounded">
                          <span className="text-sm text-yellow-800">{phase.resource_requirements}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scalability Considerations */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <TrendingUp className="mr-3 h-6 w-6 text-indigo-500" />
              <h2 className="text-2xl font-bold text-gray-900">Scalability Considerations</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Performance Bottlenecks */}
              <div>
                <div className="flex items-center mb-3">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Performance Bottlenecks</h3>
                </div>
                <div className="space-y-2">
                  {scalability_considerations.performance_bottlenecks.map((bottleneck, index) => (
                    <div key={index} className="p-3 bg-red-50 rounded-lg">
                      <span className="text-red-800 text-sm">{bottleneck}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scaling Strategies */}
              <div>
                <div className="flex items-center mb-3">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Scaling Strategies</h3>
                </div>
                <div className="space-y-2">
                  {scalability_considerations.scaling_strategies.map((strategy, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg">
                      <span className="text-green-800 text-sm">{strategy}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure Requirements */}
              <div>
                <div className="flex items-center mb-3">
                  <Server className="mr-2 h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Infrastructure Requirements</h3>
                </div>
                <div className="space-y-2">
                  {scalability_considerations.infrastructure_requirements.map((requirement, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-800 text-sm">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => router.push(`/${ideaId}/solution`)}
              >
                ← Back to Solution
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}