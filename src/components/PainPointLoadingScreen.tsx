'use client';

import { useEffect, useState } from 'react';

export const PainPointLoadingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  
  const analysisSteps = [
    "🔍 Scanning Reddit, Stack Overflow, and Hacker News...",
    "📱 Analyzing social media discussions...",
    "💬 Processing customer feedback forums...",
    "🎯 Identifying recurring pain points...",
    "📊 Evaluating problem severity...",
    "🤖 Running AI pattern recognition...",
    "⚡ Prioritizing business opportunities...",
    "✨ Generating insights report..."
  ];

  const painPointTips = [
    "Pro tip: The best startups solve problems that founders experienced personally.",
    "Research shows: 42% of startups fail because they solve problems nobody has.",
    "Pain point wisdom: If you're not slightly embarrassed by your first version, you launched too late.",
    "Founder insight: Talk to 10 people who have this problem before building anything.",
    "Market reality: People will pay more to solve a pain than to gain a pleasure.",
    "Validation tip: Ask 'How are you solving this today?' not 'Would you use this?'",
    "Business fact: The most successful companies turn customer pain into their competitive advantage.",
    "Startup wisdom: A painkiller product beats a vitamin product every time.",
    "Customer insight: Users buy solutions to problems, not features or technology.",
    "Market lesson: The bigger the pain, the less price-sensitive customers become."
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % analysisSteps.length);
    }, 5000);

    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % painPointTips.length);
    }, 7000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(tipInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated Logo/Icon */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-3xl">🔥</span>
          </div>
          <div className="absolute -inset-4 rounded-full border-2 border-orange-200 animate-ping opacity-20"></div>
          <div className="absolute -inset-8 rounded-full border border-red-100 animate-ping opacity-10" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Main Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Hunting for Pain Points</h1>
          <p className="text-lg text-gray-600">Scanning thousands of conversations to find real customer problems</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
          <div className="flex items-center space-x-3 mb-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
            <span className="text-lg font-medium text-gray-800 animate-pulse">
              {analysisSteps[currentStep]}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${((currentStep + 1) / analysisSteps.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Analyzing step {currentStep + 1} of {analysisSteps.length}
          </p>
        </div>

        {/* Pain Point Tips */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
          <h3 className="font-semibold mb-3 flex items-center justify-center">
            <span className="mr-2">💡</span>
            Pain Point Wisdom
            <span className="ml-2">🎯</span>
          </h3>
          <p className="text-sm leading-relaxed opacity-90 transition-all duration-500 ease-in-out">
            {painPointTips[currentTip]}
          </p>
        </div>

        {/* Data Sources */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h4 className="font-medium text-gray-700 mb-3">🌐 Analyzing Data From:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
              Reddit Communities
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" style={{ animationDelay: '0.5s' }}></span>
              Stack Overflow
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" style={{ animationDelay: '1s' }}></span>
              Product Forums
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" style={{ animationDelay: '1.5s' }}></span>
              Social Networks
            </div>
          </div>
        </div>

        {/* Time Estimate */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            ⏱️ Deep analysis takes 30-45 seconds
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Quality insights require patience!
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-red-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    </div>
  );
};