"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { apiService } from '@/services/api';
import { authService } from '@/services/auth';

export default function Home() {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // Initialize user ID on component mount
    const userIdFromAuth = authService.getUserId();
    setUserId(userIdFromAuth);
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

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center">
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
  );
}
