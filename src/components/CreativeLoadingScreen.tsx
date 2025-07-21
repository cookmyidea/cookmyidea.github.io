'use client';

import { useEffect, useState } from 'react';

export const CreativeLoadingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);
  
  const analysisSteps = [
    "🔍 Scanning market trends...",
    "📊 Analyzing competition landscape...",
    "💡 Evaluating technical feasibility...",
    "🎯 Assessing market demand...",
    "💰 Calculating business potential...",
    "⚡ Running AI algorithms...",
    "📈 Generating insights...",
    "✨ Finalizing analysis..."
  ];

  const entrepreneurFacts = [
    "Did you know? 90% of startups fail, but those that succeed often pivot 2-3 times before finding their market fit.",
    "Fun fact: Airbnb was rejected by investors 7 times before becoming a $100B+ company.",
    "Startup wisdom: The best ideas often come from solving your own problems first.",
    "Did you know? Netflix started as a DVD-by-mail service before revolutionizing streaming.",
    "Entrepreneur tip: Talk to 100 potential customers before writing a single line of code.",
    "Fun fact: Instagram was originally called 'Burbn' and was a location-based check-in app.",
    "Startup insight: 42% of startups fail because there's no market need for their product.",
    "Did you know? Slack started as an internal tool for a gaming company before pivoting.",
    "Business fact: The average startup takes 2-3 years to become profitable.",
    "Fun fact: Twitter was born from a brainstorming session for a podcasting platform."
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % analysisSteps.length);
    }, 5000);

    const factInterval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % entrepreneurFacts.length);
    }, 8000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(factInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated Logo/Icon */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-3xl">🚀</span>
          </div>
          <div className="absolute -inset-4 rounded-full border-2 border-blue-200 animate-ping opacity-20"></div>
        </div>

        {/* Main Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Analyzing Your Brilliant Idea</h1>
          <p className="text-lg text-gray-600">Our AI is working hard to provide you with comprehensive insights</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-lg font-medium text-gray-800 animate-pulse">
              {analysisSteps[currentStep]}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / analysisSteps.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Step {currentStep + 1} of {analysisSteps.length}
          </p>
        </div>

        {/* Entrepreneur Facts */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg">
          <h3 className="font-semibold mb-3 flex items-center">
            <span className="mr-2">💡</span>
            While you wait...
          </h3>
          <p className="text-sm leading-relaxed opacity-90 transition-all duration-500 ease-in-out">
            {entrepreneurFacts[currentFact]}
          </p>
        </div>

        {/* Time Estimate */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            ⏱️ This usually takes less than 1 minute
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Great ideas are worth the wait!
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
};