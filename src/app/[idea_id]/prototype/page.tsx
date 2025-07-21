'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiService, type IdeaObject } from '@/services/api';
import { Button } from '@/components/ui/button';
import { IdeaPageWrapper } from '@/components/IdeaPageWrapper';
import { CheckCircle, ToyBrick, ExternalLink, Users, Star, Zap, Target, Layers, Play } from 'lucide-react';

export default function PrototypePage() {
  const [data, setData] = useState<IdeaObject['prototype_description']['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const startPrototypeAnalysis = async () => {
      try {
        // First, check if analysis already exists
        const ideaObject = await apiService.getIdeaObject(ideaId);
        setLoading(false);
        
        if (ideaObject.prototype_description) {
          // Analysis already exists
          setData(ideaObject.prototype_description.data);
          return;
        }

        // If no analysis exists, start analysis
        setIsAnalysisRunning(true);
        
        // Trigger analysis without waiting for response
        apiService.triggerPrototypeAnalysis(ideaId).catch(error => {
          console.error('Error triggering prototype analysis:', error);
        });

        // Start polling every 5 seconds
        pollInterval = setInterval(async () => {
          try {
            const updatedIdeaObject = await apiService.getIdeaObject(ideaId);
            
            if (updatedIdeaObject.prototype_description) {
              setData(updatedIdeaObject.prototype_description.data);
              setIsAnalysisRunning(false);
              clearInterval(pollInterval);
            }
          } catch (error) {
            console.error('Error polling for prototype data:', error);
          }
        }, 5000);

      } catch (error) {
        console.error('Error fetching initial idea object:', error);
        setLoading(false);
        setIsAnalysisRunning(false);
      }
    };

    if (ideaId) {
      startPrototypeAnalysis();
    }

    // Cleanup interval on component unmount
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [ideaId]);

  const handleTryOtherIdea = () => {
    router.push('/');
  };

  const handleRedo = async () => {
    setIsAnalysisRunning(true);
    
    try {
      // Trigger fresh analysis without waiting for response
      apiService.triggerPrototypeAnalysis(ideaId).catch(error => {
        console.error('Error triggering prototype analysis:', error);
      });

      // Start polling every 5 seconds for the result
      const pollInterval = setInterval(async () => {
        try {
          const updatedIdeaObject = await apiService.getIdeaObject(ideaId);
          
          if (updatedIdeaObject.prototype_description) {
            setData(updatedIdeaObject.prototype_description.data);
            setIsAnalysisRunning(false);
            clearInterval(pollInterval);
          }
        } catch (error) {
          console.error('Error polling for prototype data:', error);
        }
      }, 5000);

    } catch (error) {
      console.error('Error starting prototype analysis:', error);
      setIsAnalysisRunning(false);
    }
  };

  if (loading) {
    return (
      <IdeaPageWrapper ideaId={ideaId} currentStep="prototype" isLoading={true}>
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Prototype Overview Skeleton */}
            <div className="lg:pr-8">
              <div className="h-12 bg-gray-200 rounded mb-6 animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded mb-6 animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Right side - Details Skeleton */}
            <div className="space-y-8">
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
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
      <IdeaPageWrapper ideaId={ideaId} currentStep="prototype" isLoading={true}>
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Prototype Overview Skeleton */}
            <div className="lg:pr-8">
              <div className="h-12 bg-gray-200 rounded mb-6 animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded mb-6 animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Right side - Details Skeleton */}
            <div className="space-y-8">
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </IdeaPageWrapper>
    );
  }

  if (!data) {
    return (
      <IdeaPageWrapper ideaId={ideaId} currentStep="prototype">
        <main className="flex-1 p-8">
          <div className="text-center mt-20">
            <p className="text-lg text-gray-500 mb-4">Prototype description not found</p>
            <Button onClick={() => router.push(`/${ideaId}/solution`)}>← Back to Solution</Button>
          </div>
        </main>
      </IdeaPageWrapper>
    );
  }

  const { prototype_overview, features } = data;
  const mustHaveFeatures = features.filter(f => f.priority === 'must_have');

  return (
    <IdeaPageWrapper ideaId={ideaId} currentStep="prototype">
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Prototype</h1>
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
            <Button onClick={() => router.push(`/${ideaId}/monetization`)}>
              Next step →
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-2xl p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
                <ToyBrick className="mr-2 h-4 w-4" />
                Prototype Design
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {prototype_overview.name}
              </h2>
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-semibold mb-4">
                {prototype_overview.tagline}
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {prototype_overview.core_value_proposition}
              </p>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <Button 
                size="lg"
                onClick={() => router.push(`/${ideaId}/prototype/details`)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-medium shadow-lg"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View Prototype Details
              </Button>
            </div>
          </div>
        </div>

        {/* Target Users Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="ml-3 text-2xl font-bold text-gray-900">Target Users</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prototype_overview.target_users.map((user, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <Target className="mr-3 h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-blue-800 font-medium">{user}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Features Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="ml-3 text-2xl font-bold text-gray-900">Core Features</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mustHaveFeatures.map((feature, index) => (
              <div key={index} className="p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start mb-3">
                  <CheckCircle className="mr-3 h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <h4 className="font-semibold text-green-900 text-lg">{feature.feature_name}</h4>
                </div>
                <p className="text-green-800 mb-2">{feature.user_benefit}</p>
                <div className="text-sm text-green-700">
                  <span className="font-medium">Description:</span> {feature.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Use Case & Business Context */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Primary Use Case */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Play className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="ml-3 text-xl font-bold text-gray-900">Primary Use Case</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{prototype_overview.primary_use_case}</p>
          </div>

          {/* Business Context */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Layers className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="ml-3 text-xl font-bold text-gray-900">Business Context</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{prototype_overview.business_context}</p>
          </div>
        </div>

        {/* Feature Priority Overview */}
        {features && features.length > 0 && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-yellow-600" />
              </div>
              <h3 className="ml-3 text-2xl font-bold text-gray-900">Feature Priority Overview</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {features.filter(f => f.priority === 'must_have').length}
                </div>
                <div className="text-sm text-green-800 font-medium">Must-Have Features</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600 mb-2">
                  {features.filter(f => f.priority === 'nice_to_have').length}
                </div>
                <div className="text-sm text-yellow-800 font-medium">Nice-to-Have Features</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {features.filter(f => f.priority === 'future').length}
                </div>
                <div className="text-sm text-blue-800 font-medium">Future Features</div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/${ideaId}/solution`)}
          >
            ← Back to Solution
          </Button>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={handleTryOtherIdea}
            >
              Try Another Idea
            </Button>
            <Button onClick={() => router.push(`/${ideaId}/monetization`)}>
              Next: Monetization →
            </Button>
          </div>
        </div>
      </main>
    </IdeaPageWrapper>
  );
}