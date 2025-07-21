'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiService, type IdeaObject } from '@/services/api';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
  Settings,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  PieChart
} from 'lucide-react';

export default function MonetizationDetailsPage() {
  const [data, setData] = useState<IdeaObject['monetization_strategies']['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const ideaObject = await apiService.getIdeaObject(ideaId);
        
        if (ideaObject.monetization_strategies) {
          setData(ideaObject.monetization_strategies.data);
        }
      } catch (error) {
        console.error('Error fetching monetization analysis:', error);
      } finally {
        setLoading(false);
      }
    };

    if (ideaId) {
      fetchAnalysis();
    }
  }, [ideaId]);

  const getModelTypeColor = (modelType: string) => {
    switch (modelType.toLowerCase()) {
      case 'subscription':
        return 'bg-blue-100 text-blue-800';
      case 'licensing':
        return 'bg-purple-100 text-purple-800';
      case 'transactional':
        return 'bg-green-100 text-green-800';
      case 'freemium':
        return 'bg-yellow-100 text-yellow-800';
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
            {/* Monetization sections skeleton */}
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

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-4">Monetization details not found</p>
          <Button onClick={() => router.push(`/${ideaId}/monetization`)}>← Back to Monetization</Button>
        </div>
      </div>
    );
  }

  // Use only the first strategy as requested
  const strategy = data[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push(`/${ideaId}/monetization`)}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Monetization
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Monetization Details</h1>
                <p className="text-gray-600">{strategy.strategy_name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Strategy Overview */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Lightbulb className="mr-3 h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Strategy Overview</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getModelTypeColor(strategy.model_type)}`}>
                    {strategy.model_type.charAt(0).toUpperCase() + strategy.model_type.slice(1)} Model
                  </span>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">{strategy.value_proposition}</p>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Users className="mr-2 h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-900">Target Customer</h4>
                  </div>
                  <p className="text-blue-800">{strategy.target_customer}</p>
                </div>
              </div>
              
              <div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center mb-3">
                    <BarChart3 className="mr-2 h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-900">Competitive Benchmarking</h4>
                  </div>
                  <p className="text-green-800">{strategy.competitive_benchmarking}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Structure */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <DollarSign className="mr-3 h-6 w-6 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900">Pricing Structure</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing Model</h3>
                <p className="text-gray-700 mb-4">{strategy.pricing_structure.pricing_model}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Billing Frequency</h4>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {strategy.pricing_structure.billing_frequency}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Free Tier Available</h4>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    strategy.pricing_structure.free_tier 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {strategy.pricing_structure.free_tier ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Points</h3>
                <div className="space-y-2 mb-4">
                  {strategy.pricing_structure.price_points.map((price, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <DollarSign className="mr-2 h-4 w-4 text-green-600" />
                      <span className="text-gray-700 font-medium">{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Tiers */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Tiers</h3>
              <div className="space-y-3">
                {strategy.pricing_structure.pricing_tiers.map((tier, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start">
                      <PieChart className="mr-3 h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{tier}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Projections */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <TrendingUp className="mr-3 h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900">Revenue Projections</h2>
            </div>

            {/* 3-Year Projections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{strategy.revenue_projections.year_1}</div>
                <div className="text-sm text-green-800">Year 1</div>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{strategy.revenue_projections.year_2}</div>
                <div className="text-sm text-blue-800">Year 2</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">{strategy.revenue_projections.year_3}</div>
                <div className="text-sm text-purple-800">Year 3</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Assumptions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Assumptions</h3>
                <div className="space-y-2">
                  {strategy.revenue_projections.assumptions.map((assumption, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{assumption}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sensitivity Analysis */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sensitivity Analysis</h3>
                <div className="space-y-2">
                  {strategy.revenue_projections.sensitivity_analysis.map((analysis, index) => (
                    <div key={index} className="flex items-start p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="mr-2 h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                      <span className="text-yellow-800 text-sm">{analysis}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Requirements */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Settings className="mr-3 h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-900">Implementation Requirements</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {strategy.implementation_requirements.map((requirement, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start">
                    <Settings className="mr-2 h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pros & Cons Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pros */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <TrendingUp className="mr-3 h-6 w-6 text-green-500" />
                <h2 className="text-2xl font-bold text-gray-900">Advantages</h2>
              </div>
              
              <div className="space-y-3">
                {strategy.pros.map((pro, index) => (
                  <div key={index} className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-green-800">{pro}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cons */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <TrendingDown className="mr-3 h-6 w-6 text-red-500" />
                <h2 className="text-2xl font-bold text-gray-900">Challenges</h2>
              </div>
              
              <div className="space-y-3">
                {strategy.cons.map((con, index) => (
                  <div key={index} className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle className="mr-2 h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-red-800">{con}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Validation */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Target className="mr-3 h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900">Market Validation Needed</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strategy.market_validation_needed.map((validation, index) => (
                <div key={index} className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                  <div className="flex items-start">
                    <Target className="mr-2 h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                    <span className="text-orange-800">{validation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => router.push(`/${ideaId}/monetization`)}
              >
                ← Back to Monetization
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}