'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiService, type PainPointData, type IdeaObject } from '@/services/api';
import { PainPointLoadingScreen } from '@/components/PainPointLoadingScreen';
import { 
  ClipboardCheck,
  AlertTriangle,
  Lightbulb,
  ToyBrick,
  CircleDollarSign,
  PanelTop,
  Target,
  FileText
} from 'lucide-react';

export default function PainPointsPage() {
  const [data, setData] = useState<IdeaObject['ai_pain_point_analysis']['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First, try to get the idea object
        const ideaObject = await apiService.getIdeaObject(ideaId);
        
        // Check if pain point analysis exists (you may need to adjust this property name based on actual response)
        if (ideaObject.ai_pain_point_analysis) {
          // Convert IdeaObject to PainPointData format
          setData(ideaObject.ai_pain_point_analysis.data);
        } else {
          // If no pain point analysis, run the analysis
          const result = await apiService.triggerPainPointAnalysis(ideaId);
          setData(result.ai_pain_point_analysis.data);
        }
      } catch (error) {
        console.error('Error fetching pain point data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (ideaId) {
      fetchData();
    }
  }, [ideaId]);

  if (loading) {
    return <PainPointLoadingScreen />;
  }

  const painPointData = data?.selected_pain_point;

  const handleTryOtherIdea = () => {
    router.push('/');
  };

  const handleRedo = async () => {
    setLoading(true);
    try {
      // For redo, always fetch fresh pain point analysis
      const result = await apiService.triggerPainPointAnalysis(ideaId);
      setData(result.ai_pain_point_analysis.data);
    } catch (error) {
      console.error('Error refetching pain point data:', error);
    } finally {
      setLoading(false);
    }
  };

  const iconMapping: { [key: string]: React.ElementType } = {
    'Initial evaluation': ClipboardCheck,
    'Pain Points': AlertTriangle,
    'Solution': Lightbulb,
    'Prototype': ToyBrick,
    'Monetization': CircleDollarSign,
    'Landing Pages': PanelTop,
    'Ads Test Campaign': Target,
    'MVP Document': FileText,
  };

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-64 bg-gray-50 p-8 border-r">
        <nav>
          <ul>
            <li className="mb-4">
              <a href={`/${ideaId}/evaluation`} className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Initial evaluation
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-sm font-medium text-blue-600 bg-blue-100 rounded-lg p-2">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Pain Points
              </a>
            </li>
            {['Solution', 'Prototype', 'Monetization', 'Landing Pages', 'Ads Test Campaign', 'MVP Document'].map((item) => {
              const Icon = iconMapping[item];
              return (
                <li key={item} className="mb-4">
                  <a href="#" className="flex items-center text-sm font-medium text-gray-400 cursor-not-allowed">
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

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
            <p className="text-gray-600">{painPointData?.detailed_description}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">AI Solution</h2>
            <p className="text-gray-600 mb-4">This pain point is a direct consequence of information overload and the limitations of traditional search methods, which AI is uniquely positioned to solve.</p>
            <div className="flex items-center justify-between mb-2">
              <span>AI Applicability Score</span>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-green-200 rounded-full mr-2">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: `${painPointData?.ai_applicability_score * 10}%` }}></div>
                </div>
                <span>{painPointData?.ai_applicability_score}/10 High</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Business Impact Potential</span>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-green-200 rounded-full mr-2">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: `${painPointData?.business_impact_potential * 10}%` }}></div>
                </div>
                <span>{painPointData?.business_impact_potential}/10 High</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}