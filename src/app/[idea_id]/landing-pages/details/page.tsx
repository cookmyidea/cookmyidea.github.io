'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiService, type IdeaObject } from '@/services/api';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, CheckCircle } from 'lucide-react';

export default function LandingPagesDetailsPage() {
  const [data, setData] = useState<IdeaObject['landing_pages']['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const params = useParams();
  const ideaId = params.idea_id as string;

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const ideaObject = await apiService.getIdeaObject(ideaId);
        
        if (ideaObject.landing_pages) {
          setData(ideaObject.landing_pages.data);
        }
      } catch (error) {
        console.error('Error fetching landing pages analysis:', error);
      } finally {
        setLoading(false);
      }
    };

    if (ideaId) {
      fetchAnalysis();
    }
  }, [ideaId]);

  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
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

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            {/* Document skeleton */}
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="mb-8">
                <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
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
          <p className="text-lg text-gray-500 mb-4">Landing page details not found</p>
          <Button onClick={() => router.push(`/${ideaId}/landing-pages`)}>← Back to Landing Pages</Button>
        </div>
      </div>
    );
  }

  // Use only the first landing page as requested
  const landingPage = data[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push(`/${ideaId}/landing-pages`)}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Landing Pages
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Landing Page Documentation</h1>
                <p className="text-gray-600">{landingPage.page_name}</p>
              </div>
            </div>
            <Button 
              variant="default"
              onClick={() => handleCopyPrompt(landingPage.prompt)}
              className="flex items-center"
            >
              {copied ? (
                <CheckCircle className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {copied ? 'Copied!' : 'Copy Prompt'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Document Header */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Landing Page Documentation</h1>
            <h2 className="text-xl text-gray-700 mb-4">{landingPage.page_name}</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Content Generation Prompt</h3>
              <p className="text-gray-700 text-sm leading-relaxed italic">{landingPage.prompt}</p>
            </div>
          </div>

          {/* Overview Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">Primary Objective</h3>
                <p className="text-gray-700">{landingPage.primary_objective}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Target Audience</h3>
                <p className="text-gray-700">{landingPage.target_audience}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Monetization Strategy</h3>
                <p className="text-gray-700">{landingPage.monetization_strategy}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Unique Selling Proposition</h3>
                <p className="text-gray-700">{landingPage.unique_selling_proposition}</p>
              </div>
            </div>
          </section>

          {/* Page Structure */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Page Structure</h2>
            
            {/* Hero Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Hero Section</h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <div className="space-y-2">
                  <div><strong>Headline:</strong> {landingPage.page_structure.hero_section.headline}</div>
                  <div><strong>Subheadline:</strong> {landingPage.page_structure.hero_section.subheadline}</div>
                  <div><strong>Value Proposition:</strong> {landingPage.page_structure.hero_section.value_proposition}</div>
                  <div><strong>CTA Button:</strong> {landingPage.page_structure.hero_section.cta_button}</div>
                  <div><strong>Hero Image:</strong> {landingPage.page_structure.hero_section.hero_image_description}</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Trust Indicators:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {landingPage.page_structure.hero_section.trust_indicators.map((indicator, index) => (
                    <li key={index}>{indicator}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Problem Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Problem Section</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Problem Statement:</h4>
                  <p className="text-gray-700">{landingPage.page_structure.problem_section.problem_statement}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Pain Point Bullets:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {landingPage.page_structure.problem_section.pain_point_bullets.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Current Solution Issues:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {landingPage.page_structure.problem_section.current_solution_issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Impact Statistics:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {landingPage.page_structure.problem_section.impact_statistics.map((stat, index) => (
                      <li key={index}>{stat}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Solution Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Solution Section</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Solution Headline:</h4>
                  <p className="text-gray-700">{landingPage.page_structure.solution_section.solution_headline}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {landingPage.page_structure.solution_section.key_benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Feature Highlights:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {landingPage.page_structure.solution_section.feature_highlights.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">AI Advantage:</h4>
                  <p className="text-gray-700">{landingPage.page_structure.solution_section.ai_advantage}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Demo Description:</h4>
                  <p className="text-gray-700">{landingPage.page_structure.solution_section.demo_description}</p>
                </div>
              </div>
            </div>

            {/* Social Proof Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">4. Social Proof Section</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Testimonials:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {landingPage.page_structure.social_proof.testimonials.map((testimonial, index) => (
                      <li key={index}>"{testimonial}"</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Case Studies:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {landingPage.page_structure.social_proof.case_studies.map((study, index) => (
                      <li key={index}>{study}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Statistics:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {landingPage.page_structure.social_proof.stats.map((stat, index) => (
                      <li key={index}>{stat}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Trust Badges:</h4>
                  <div className="flex flex-wrap gap-2">
                    {landingPage.page_structure.social_proof.trust_badges.map((badge, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">5. Pricing Section</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Pricing Headline:</h4>
                  <p className="text-gray-700">{landingPage.page_structure.pricing_section.pricing_headline}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Pricing Options:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {landingPage.page_structure.pricing_section.pricing_options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Pricing CTA:</h4>
                  <p className="text-gray-700 font-medium">{landingPage.page_structure.pricing_section.pricing_cta}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Value Justification:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {landingPage.page_structure.pricing_section.value_justification.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">6. Call-to-Action Section</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Final CTA:</h4>
                  <p className="text-gray-700 font-medium">{landingPage.page_structure.cta_section.final_cta}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Urgency Elements:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {landingPage.page_structure.cta_section.urgency_elements.map((element, index) => (
                      <li key={index}>{element}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Risk Reversal:</h4>
                  <p className="text-gray-700">{landingPage.page_structure.cta_section.risk_reversal}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Contact Information:</h4>
                  <p className="text-gray-700">{landingPage.page_structure.cta_section.contact_information}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Conversion Elements */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversion Elements</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {landingPage.conversion_elements.map((element, index) => (
                <li key={index}>{element}</li>
              ))}
            </ul>
          </section>

          {/* A/B Testing Variations */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">A/B Testing Variations</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {landingPage.ab_testing_variations.map((variation, index) => (
                <li key={index}>{variation}</li>
              ))}
            </ul>
          </section>

          {/* Mobile Optimization */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mobile Optimization</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {landingPage.mobile_optimization.map((optimization, index) => (
                <li key={index}>{optimization}</li>
              ))}
            </ul>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => router.push(`/${ideaId}/landing-pages`)}
              >
                ← Back to Landing Pages
              </Button>
              <Button 
                onClick={() => handleCopyPrompt(landingPage.prompt)}
                className="flex items-center"
              >
                {copied ? (
                  <CheckCircle className="mr-2 h-4 w-4" />
                ) : (
                  <Copy className="mr-2 h-4 w-4" />
                )}
                {copied ? 'Copied!' : 'Copy Prompt'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}