'use client';

import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { IdeaPageWrapper } from '@/components/IdeaPageWrapper';
import { Check, MessageSquare, Users, Search, Star } from 'lucide-react';

export default function TestingPage() {
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  const handleTryOtherIdea = () => {
    router.push('/');
  };

  const scrollToPricingSection = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <IdeaPageWrapper ideaId={ideaId} currentStep="testing">
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Testing Options</h1>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={handleTryOtherIdea}
            >
              Try other idea
            </Button>
          </div>
        </header>

        {/* Three Column Pricing Layout */}
        <div id="pricing-section" className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Column 1: Talk to idea - $20 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Talk to idea</h2>
              <div className="text-4xl font-bold text-green-600 mb-1">$20</div>
              <p className="text-gray-500">one-time</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Challenge my idea</span>
              </div>
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Talk with AI investor</span>
              </div>
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Brainstorm creative solutions</span>
              </div>
            </div>

            <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
              Select Talk to idea
            </Button>
          </div>

          {/* Column 2: Validate with expert - $50 (Most Popular) */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-green-500 p-8 relative">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                <Star className="mr-1 h-4 w-4" />
                Most Popular
              </div>
            </div>

            <div className="text-center mb-6 mt-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Validate with expert</h2>
              <div className="text-4xl font-bold text-green-600 mb-1">$50</div>
              <p className="text-gray-500">one-time</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Everything in Talk to idea</span>
              </div>
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Industry expert consultation</span>
              </div>
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Market feasibility analysis</span>
              </div>
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Technical implementation review</span>
              </div>
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Competitive landscape assessment</span>
              </div>
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Personalized feedback report</span>
              </div>
            </div>

            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
              Select Validate with expert
            </Button>
          </div>

          {/* Column 3: DYOR - $10 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">DYOR</h2>
              <p className="text-sm text-gray-600 mb-2">(Do Your Own Research)</p>
              <div className="text-4xl font-bold text-green-600 mb-1">$10</div>
              <p className="text-gray-500">one-time</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">List of forums and social accounts with example messages for engagement</span>
              </div>
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Interview strategy and scripts</span>
              </div>
              <div className="flex items-start">
                <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Slides to present your idea</span>
              </div>
            </div>

            <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
              Select DYOR
            </Button>
          </div>
        </div>

        {/* Public Marketplace Alternative */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Not Ready to Invest in Testing?</h3>
            <p className="text-lg text-gray-700 mb-6">
              No problem! If you don't select any testing option, your idea will be <strong>automatically published</strong> to our public marketplace in <strong>3 days</strong> where other entrepreneurs and investors can discover it.
            </p>
            
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">What happens when your idea goes public:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Your idea becomes visible to potential co-founders</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Investors can discover and evaluate your concept</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Community feedback and discussions</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Networking opportunities with like-minded entrepreneurs</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-yellow-100 text-yellow-800 px-6 py-3 rounded-lg text-sm font-medium">
                ⏰ Auto-publish countdown: 3 days remaining
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose the Right Testing Path</h3>
          <p className="text-gray-600 text-lg mb-8">
            Select the testing option that best fits your needs and budget. Each option provides different levels of validation and support.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className="p-6 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors border-2 border-transparent hover:border-blue-200 group"
              onClick={scrollToPricingSection}
            >
              <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Dialogue</h4>
              <p className="text-sm text-gray-600">Get immediate feedback through intelligent conversations with our AI system</p>
              <div className="mt-3 text-center">
                <span className="text-blue-600 font-semibold text-sm">Choose Talk to idea - $20</span>
              </div>
            </div>
            <div 
              className="p-6 bg-green-50 rounded-xl cursor-pointer hover:bg-green-100 transition-colors border-2 border-transparent hover:border-green-200 group"
              onClick={scrollToPricingSection}
            >
              <Users className="h-8 w-8 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900 mb-2">Expert Validation</h4>
              <p className="text-sm text-gray-600">Professional review from industry experts with detailed analysis and recommendations</p>
              <div className="mt-3 text-center">
                <span className="text-green-600 font-semibold text-sm">Choose Validate with expert - $50</span>
              </div>
            </div>
            <div 
              className="p-6 bg-purple-50 rounded-xl cursor-pointer hover:bg-purple-100 transition-colors border-2 border-transparent hover:border-purple-200 group"
              onClick={scrollToPricingSection}
            >
              <Search className="h-8 w-8 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900 mb-2">Self-Research Tools</h4>
              <p className="text-sm text-gray-600">Complete toolkit for conducting your own market research and validation</p>
              <div className="mt-3 text-center">
                <span className="text-purple-600 font-semibold text-sm">Choose DYOR - $10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/${ideaId}/landing-pages`)}
          >
            ← Back to Landing Pages
          </Button>
          <Button 
            variant="outline" 
            onClick={handleTryOtherIdea}
          >
            Try Another Idea
          </Button>
        </div>
      </main>
    </IdeaPageWrapper>
  );
}