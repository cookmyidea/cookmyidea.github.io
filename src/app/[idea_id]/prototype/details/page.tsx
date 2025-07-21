'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiService, type IdeaObject } from '@/services/api';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  Lightbulb,
  Users,
  Smartphone,
  Code,
  Target,
  BarChart3,
  TestTube,
  AlertTriangle,
  TrendingUp,
  Settings,
  Eye,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function PrototypeDetailsPage() {
  const [data, setData] = useState<IdeaObject['prototype_description']['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const ideaObject = await apiService.getIdeaObject(ideaId);
        
        if (ideaObject.prototype_description) {
          setData(ideaObject.prototype_description.data);
        }
      } catch (error) {
        console.error('Error fetching prototype analysis:', error);
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

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'must_have':
        return 'bg-red-100 text-red-800';
      case 'should_have':
        return 'bg-orange-100 text-orange-800';
      case 'could_have':
        return 'bg-blue-100 text-blue-800';
      case 'wont_have':
        return 'bg-gray-100 text-gray-800';
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
            {/* Prototype sections skeleton */}
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
          <p className="text-lg text-gray-500 mb-4">Prototype details not found</p>
          <Button onClick={() => router.push(`/${ideaId}/prototype`)}>← Back to Prototype</Button>
        </div>
      </div>
    );
  }

  const { 
    prototype_overview, 
    features, 
    user_interface, 
    technical_implementation, 
    validation_metrics, 
    user_testing_plan, 
    prototype_limitations, 
    next_iteration_features 
  } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push(`/${ideaId}/prototype`)}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Prototype
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prototype Details</h1>
                <p className="text-gray-600">{prototype_overview.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Prototype Overview */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Lightbulb className="mr-3 h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Prototype Overview</h2>
            </div>
            
            <div className="mb-6">
              <p className="text-lg text-blue-600 font-medium mb-4">{prototype_overview.tagline}</p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">{prototype_overview.core_value_proposition}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-3">
                    <Users className="mr-2 h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Target Users</h3>
                  </div>
                  <div className="space-y-2">
                    {prototype_overview.target_users.map((user, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{user}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-3">
                    <Target className="mr-2 h-5 w-5 text-green-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Primary Use Case</h3>
                  </div>
                  <p className="text-gray-700 mb-4">{prototype_overview.primary_use_case}</p>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Business Context</h4>
                    <p className="text-green-800 text-sm">{prototype_overview.business_context}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Settings className="mr-3 h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-900">Features</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{feature.feature_name}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(feature.priority)}`}>
                        {feature.priority.replace('_', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(feature.technical_complexity)}`}>
                        {feature.technical_complexity}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                  <div className="mb-3">
                    <span className="text-xs font-medium text-gray-500">User Benefit:</span>
                    <p className="text-sm text-gray-700 mt-1">{feature.user_benefit}</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded">
                    <span className="text-xs font-medium text-blue-900">Validation Metric:</span>
                    <p className="text-xs text-blue-800 mt-1">{feature.validation_metric}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Interface */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Smartphone className="mr-3 h-6 w-6 text-indigo-500" />
              <h2 className="text-2xl font-bold text-gray-900">User Interface</h2>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Eye className="mr-2 h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-semibold text-gray-900">Interface Type: {user_interface.interface_type}</h3>
              </div>
            </div>

            {/* Key Screens */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Screens</h3>
              <div className="space-y-6">
                {user_interface.key_screens.map((screen, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{screen.screen_name}</h4>
                    <p className="text-gray-600 text-sm mb-4">{screen.purpose}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Main Elements</h5>
                        <ul className="space-y-1">
                          {screen.main_elements.map((element, elementIndex) => (
                            <li key={elementIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">{element}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">User Actions</h5>
                        <ul className="space-y-1">
                          {screen.user_actions.map((action, actionIndex) => (
                            <li key={actionIndex} className="flex items-start">
                              <CheckCircle className="mr-2 h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Success Indicators</h5>
                        <ul className="space-y-1">
                          {screen.success_indicators.map((indicator, indicatorIndex) => (
                            <li key={indicatorIndex} className="flex items-start">
                              <Target className="mr-2 h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{indicator}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Principles & Accessibility */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Design Principles</h3>
                <div className="space-y-2">
                  {user_interface.design_principles.map((principle, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{principle}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Accessibility Considerations</h3>
                <div className="space-y-2">
                  {user_interface.accessibility_considerations.map((consideration, index) => (
                    <div key={index} className="flex items-start">
                      <Eye className="mr-2 h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{consideration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Implementation */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Code className="mr-3 h-6 w-6 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900">Technical Implementation</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div>
                <div className="p-4 bg-green-50 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">AI Integration</h3>
                  <p className="text-green-800">{technical_implementation.ai_integration}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Sources</h3>
                  <div className="space-y-2">
                    {technical_implementation.data_sources.map((source, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{source}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">API Endpoints</h3>
                  <div className="space-y-2 mb-6">
                    {technical_implementation.api_endpoints.map((endpoint, index) => (
                      <div key={index} className="p-2 bg-gray-100 rounded font-mono text-sm">
                        {endpoint}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Targets</h3>
                  <div className="space-y-2">
                    {technical_implementation.performance_targets.map((target, index) => (
                      <div key={index} className="flex items-start">
                        <Target className="mr-2 h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{target}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Security Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Security Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {technical_implementation.security_requirements.map((requirement, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg">
                    <span className="text-red-800 text-sm">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Validation Metrics */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <BarChart3 className="mr-3 h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900">Validation Metrics</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {validation_metrics.map((metric, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{metric.metric}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Measurement:</strong> {metric.measurement}</p>
                    <p><strong>Success Threshold:</strong> {metric.success_threshold}</p>
                    <p><strong>Collection Method:</strong> {metric.collection_method}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Testing Plan */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <TestTube className="mr-3 h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-900">User Testing Plan</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Testing Methods</h3>
                <div className="space-y-2">
                  {user_testing_plan.testing_methods.map((method, index) => (
                    <div key={index} className="flex items-start">
                      <TestTube className="mr-2 h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Target Participants</h3>
                <div className="space-y-2">
                  {user_testing_plan.target_participants.map((participant, index) => (
                    <div key={index} className="flex items-start">
                      <Users className="mr-2 h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{participant}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Success Criteria</h3>
                <div className="space-y-2">
                  {user_testing_plan.success_criteria.map((criteria, index) => (
                    <div key={index} className="flex items-start">
                      <Target className="mr-2 h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{criteria}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Limitations & Next Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Prototype Limitations */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <AlertTriangle className="mr-3 h-6 w-6 text-red-500" />
                <h2 className="text-2xl font-bold text-gray-900">Prototype Limitations</h2>
              </div>
              
              <div className="space-y-2">
                {prototype_limitations.map((limitation, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg">
                    <span className="text-red-800 text-sm">{limitation}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Iteration Features */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <TrendingUp className="mr-3 h-6 w-6 text-green-500" />
                <h2 className="text-2xl font-bold text-gray-900">Next Iteration Features</h2>
              </div>
              
              <div className="space-y-2">
                {next_iteration_features.map((feature, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg">
                    <span className="text-green-800 text-sm">{feature}</span>
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
                onClick={() => router.push(`/${ideaId}/prototype`)}
              >
                ← Back to Prototype
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}