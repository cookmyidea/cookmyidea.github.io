"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Lightbulb, ArrowRight } from 'lucide-react';
import { apiService } from '@/services/api';
import { authService } from '@/services/auth';

interface UserIdea {
  _id: string;
  idea: string;
  created_at: string;
  initial_analyze?: {
    data?: {
      idea_title?: string;
    }
  };
}

export default function Home() {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [userIdeas, setUserIdeas] = useState<UserIdea[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Initialize user ID on component mount
    const userIdFromAuth = authService.getUserId();
    setUserId(userIdFromAuth);
    
    // Fetch user's previous ideas
    const fetchUserIdeas = async () => {
      try {
        setLoadingIdeas(true);
        // For now, we'll use a mock API call - you'll need to implement this endpoint
        // const ideas = await apiService.getUserIdeas(userIdFromAuth);
        
        // Mock data for demonstration - replace with actual API call
        const mockIdeas: UserIdea[] = [
          {
            _id: "idea1",
            idea: "A platform for local artists to sell their work directly to customers",
            created_at: "2024-01-15T10:30:00Z",
            initial_analyze: {
              data: {
                idea_title: "Local Art Marketplace"
              }
            }
          },
          {
            _id: "idea2", 
            idea: "AI-powered personal fitness coach that adapts to your schedule",
            created_at: "2024-01-10T14:20:00Z",
            initial_analyze: {
              data: {
                idea_title: "Smart Fitness AI"
              }
            }
          },
          {
            _id: "idea3",
            idea: "Sustainable packaging solutions for e-commerce businesses",
            created_at: "2024-01-05T09:15:00Z"
          }
        ];
        
        setUserIdeas(mockIdeas);
      } catch (error) {
        console.error('Failed to fetch user ideas:', error);
      } finally {
        setLoadingIdeas(false);
      }
    };
    
    if (userIdFromAuth) {
      fetchUserIdeas();
    } else {
      setLoadingIdeas(false);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!idea.trim() || isLoading || !userId) return;

    setIsLoading(true);
    try {
      const {_id: ideaId} = await apiService.submitIdea({ idea, user_id: userId });
      router.push(`/${ideaId}/evaluation`);
    } catch (error) {
      console.error('Failed to submit idea:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Main Form Section */}
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-full max-w-2xl px-4">
          <form onSubmit={handleSubmit} className="text-center">
            <Label htmlFor="idea-input" className="text-2xl font-medium mb-4 block">
              Just enter your idea
            </Label>
            <Textarea
              id="idea-input"
              placeholder="e.g., A platform for local artists to sell their work..."
              rows={3}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="text-lg p-4 mb-6"
              disabled={isLoading}
            />
            <Button type="submit" size="lg" disabled={isLoading || !idea.trim() || !userId}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Lets start
            </Button>
          </form>
        </div>
      </div>

      {/* User Ideas Section */}
      {userIdeas.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 pb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Previous Ideas</h2>
            <p className="text-gray-600">Continue working on your existing ideas or start fresh</p>
          </div>

          {loadingIdeas ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 w-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userIdeas.map((userIdea) => (
                <div
                  key={userIdea._id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => router.push(`/${userIdea._id}/evaluation`)}
                >
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <Lightbulb className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {userIdea.initial_analyze?.data?.idea_title || 'Untitled Idea'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(userIdea.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {userIdea.idea}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {userIdea.initial_analyze ? 'Analyzed' : 'Draft'}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Marketplace Link */}
      <div className="text-center py-8 bg-white border-t border-gray-200">
        <p className="text-gray-600 mb-4">Looking for inspiration?</p>
        <Button
          variant="outline"
          onClick={() => router.push('/marketplace')}
        >
          Browse Marketplace Ideas
        </Button>
      </div>
    </div>
  );
}
