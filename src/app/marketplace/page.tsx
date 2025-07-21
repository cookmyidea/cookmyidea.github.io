'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Eye, Star, TrendingUp, Users, Lightbulb, Zap, Filter, Search } from 'lucide-react';

// Dummy data for marketplace ideas
const marketplaceIdeas = [
  {
    id: 1,
    title: "AI-Powered Personal Finance Coach",
    description: "An intelligent financial advisor that analyzes spending patterns and provides personalized budgeting recommendations using machine learning.",
    category: "FinTech",
    tags: ["AI", "Finance", "Mobile App", "Machine Learning"],
    author: "Sarah Chen",
    publishedDate: "2 days ago",
    views: 1247,
    likes: 89,
    comments: 23,
    aiScore: 9.2,
    businessImpact: 8.7,
    complexity: "Medium",
    status: "Looking for Co-founder"
  },
  {
    id: 2,
    title: "Smart Home Energy Optimization System",
    description: "IoT-based system that uses AI to optimize energy consumption in homes, reducing bills by up to 40% through intelligent device management.",
    category: "IoT",
    tags: ["IoT", "Energy", "Smart Home", "Sustainability"],
    author: "Michael Rodriguez",
    publishedDate: "5 days ago",
    views: 892,
    likes: 67,
    comments: 15,
    aiScore: 8.5,
    businessImpact: 9.1,
    complexity: "High",
    status: "Seeking Investment"
  },
  {
    id: 3,
    title: "AI Language Learning Companion",
    description: "Personalized language learning app with AI conversation partners that adapt to individual learning styles and pace.",
    category: "EdTech",
    tags: ["AI", "Education", "Language", "Personalization"],
    author: "Emma Thompson",
    publishedDate: "1 week ago",
    views: 2156,
    likes: 143,
    comments: 34,
    aiScore: 8.9,
    businessImpact: 8.3,
    complexity: "Medium",
    status: "In Development"
  },
  {
    id: 4,
    title: "Automated Code Review Assistant",
    description: "AI-powered tool that performs comprehensive code reviews, detects bugs, suggests optimizations, and ensures coding standards compliance.",
    category: "Developer Tools",
    tags: ["AI", "Development", "Code Review", "Automation"],
    author: "David Kim",
    publishedDate: "3 days ago",
    views: 1534,
    likes: 98,
    comments: 28,
    aiScore: 9.0,
    businessImpact: 8.8,
    complexity: "High",
    status: "Looking for Co-founder"
  },
  {
    id: 5,
    title: "AI-Driven Mental Health Support Platform",
    description: "Digital platform providing 24/7 mental health support through AI chatbots, mood tracking, and personalized therapy recommendations.",
    category: "HealthTech",
    tags: ["AI", "Mental Health", "Healthcare", "Support"],
    author: "Dr. Jessica Park",
    publishedDate: "4 days ago",
    views: 987,
    likes: 76,
    comments: 19,
    aiScore: 8.7,
    businessImpact: 9.3,
    complexity: "High",
    status: "Seeking Investment"
  },
  {
    id: 6,
    title: "Smart Inventory Management for Restaurants",
    description: "AI system that predicts food demand, optimizes inventory levels, and reduces waste in restaurants through intelligent ordering automation.",
    category: "Restaurant Tech",
    tags: ["AI", "Inventory", "Restaurant", "Waste Reduction"],
    author: "Carlos Mendez",
    publishedDate: "6 days ago",
    views: 743,
    likes: 52,
    comments: 12,
    aiScore: 8.2,
    businessImpact: 8.5,
    complexity: "Medium",
    status: "Ready to Launch"
  },
  {
    id: 7,
    title: "AI-Powered Recruitment Platform",
    description: "Revolutionize hiring with AI that matches candidates to jobs based on skills, personality, and cultural fit rather than just keywords.",
    category: "HR Tech",
    tags: ["AI", "Recruitment", "HR", "Matching"],
    author: "Lisa Wang",
    publishedDate: "1 day ago",
    views: 654,
    likes: 41,
    comments: 8,
    aiScore: 8.4,
    businessImpact: 8.9,
    complexity: "Medium",
    status: "Looking for Co-founder"
  },
  {
    id: 8,
    title: "Predictive Maintenance for Manufacturing",
    description: "AI-driven predictive analytics to prevent equipment failures, reduce downtime, and optimize maintenance schedules in manufacturing facilities.",
    category: "Manufacturing",
    tags: ["AI", "Predictive Analytics", "Manufacturing", "IoT"],
    author: "Robert Johnson",
    publishedDate: "3 days ago",
    views: 1123,
    likes: 82,
    comments: 17,
    aiScore: 9.1,
    businessImpact: 9.4,
    complexity: "High",
    status: "Seeking Investment"
  },
  {
    id: 9,
    title: "AI Writing Assistant for Legal Documents",
    description: "Specialized AI tool that helps lawyers draft contracts, legal briefs, and other documents while ensuring compliance and accuracy.",
    category: "LegalTech",
    tags: ["AI", "Legal", "Document Generation", "Compliance"],
    author: "Jennifer Martinez",
    publishedDate: "1 week ago",
    views: 892,
    likes: 65,
    comments: 21,
    aiScore: 8.6,
    businessImpact: 8.7,
    complexity: "High",
    status: "In Development"
  },
  {
    id: 10,
    title: "Smart Crop Monitoring System",
    description: "Drone and satellite-based AI system that monitors crop health, predicts yields, and optimizes irrigation for precision agriculture.",
    category: "AgriTech",
    tags: ["AI", "Agriculture", "Drones", "Computer Vision"],
    author: "Ahmed Hassan",
    publishedDate: "4 days ago",
    views: 567,
    likes: 38,
    comments: 9,
    aiScore: 8.3,
    businessImpact: 8.8,
    complexity: "High",
    status: "Ready to Launch"
  },
  {
    id: 11,
    title: "AI-Enhanced Video Editing Platform",
    description: "Automated video editing tool that uses AI to create professional-quality videos from raw footage with intelligent scene selection and transitions.",
    category: "Media Tech",
    tags: ["AI", "Video Editing", "Automation", "Creative Tools"],
    author: "Sofia Petrov",
    publishedDate: "2 days ago",
    views: 1876,
    likes: 124,
    comments: 31,
    aiScore: 8.1,
    businessImpact: 7.9,
    complexity: "Medium",
    status: "Looking for Co-founder"
  },
  {
    id: 12,
    title: "Intelligent Customer Service Chatbot",
    description: "Advanced conversational AI that handles complex customer inquiries, learns from interactions, and provides personalized support at scale.",
    category: "Customer Service",
    tags: ["AI", "Chatbot", "Customer Support", "NLP"],
    author: "Marcus Thompson",
    publishedDate: "5 days ago",
    views: 934,
    likes: 71,
    comments: 14,
    aiScore: 8.8,
    businessImpact: 9.0,
    complexity: "Medium",
    status: "Seeking Investment"
  },
  {
    id: 13,
    title: "AI-Powered Fashion Recommendation Engine",
    description: "Personalized fashion recommendations based on body type, style preferences, weather, and occasion using computer vision and ML.",
    category: "E-commerce",
    tags: ["AI", "Fashion", "Recommendations", "Computer Vision"],
    author: "Isabella Romano",
    publishedDate: "3 days ago",
    views: 1234,
    likes: 96,
    comments: 18,
    aiScore: 7.9,
    businessImpact: 8.2,
    complexity: "Medium",
    status: "In Development"
  },
  {
    id: 14,
    title: "Smart Building Climate Control",
    description: "AI system that optimizes heating, cooling, and ventilation in buildings based on occupancy patterns, weather, and energy costs.",
    category: "PropTech",
    tags: ["AI", "Smart Buildings", "Energy", "IoT"],
    author: "James Wilson",
    publishedDate: "1 week ago",
    views: 687,
    likes: 49,
    comments: 11,
    aiScore: 8.4,
    businessImpact: 8.6,
    complexity: "High",
    status: "Ready to Launch"
  },
  {
    id: 15,
    title: "AI-Driven Investment Portfolio Manager",
    description: "Automated investment platform that uses AI to create and manage diversified portfolios based on risk tolerance and market conditions.",
    category: "FinTech",
    tags: ["AI", "Investment", "Portfolio Management", "Risk Analysis"],
    author: "Alexander Kim",
    publishedDate: "2 days ago",
    views: 1567,
    likes: 118,
    comments: 29,
    aiScore: 9.3,
    businessImpact: 9.2,
    complexity: "High",
    status: "Looking for Co-founder"
  },
  {
    id: 16,
    title: "Medical Image Analysis Platform",
    description: "AI-powered diagnostic tool that analyzes medical images (X-rays, MRIs, CT scans) to assist radiologists in detecting abnormalities.",
    category: "HealthTech",
    tags: ["AI", "Medical Imaging", "Diagnosis", "Computer Vision"],
    author: "Dr. Rachel Green",
    publishedDate: "4 days ago",
    views: 2134,
    likes: 156,
    comments: 42,
    aiScore: 9.5,
    businessImpact: 9.7,
    complexity: "High",
    status: "Seeking Investment"
  },
  {
    id: 17,
    title: "AI-Enhanced Cybersecurity Monitor",
    description: "Real-time threat detection system that uses machine learning to identify and respond to cyber attacks before they cause damage.",
    category: "Cybersecurity",
    tags: ["AI", "Security", "Threat Detection", "Machine Learning"],
    author: "Nathan Cooper",
    publishedDate: "1 day ago",
    views: 834,
    likes: 62,
    comments: 13,
    aiScore: 9.2,
    businessImpact: 9.4,
    complexity: "High",
    status: "In Development"
  },
  {
    id: 18,
    title: "Smart Traffic Management System",
    description: "AI-powered traffic optimization that reduces congestion, improves safety, and minimizes emissions through intelligent signal control.",
    category: "Smart City",
    tags: ["AI", "Traffic", "Smart City", "Optimization"],
    author: "Maria Gonzalez",
    publishedDate: "6 days ago",
    views: 1098,
    likes: 84,
    comments: 16,
    aiScore: 8.7,
    businessImpact: 9.1,
    complexity: "High",
    status: "Ready to Launch"
  },
  {
    id: 19,
    title: "AI Content Moderation Tool",
    description: "Automated content moderation system that detects harmful, inappropriate, or spam content across social media and online platforms.",
    category: "Social Media",
    tags: ["AI", "Content Moderation", "Safety", "NLP"],
    author: "Kevin Chang",
    publishedDate: "3 days ago",
    views: 756,
    likes: 58,
    comments: 12,
    aiScore: 8.5,
    businessImpact: 8.4,
    complexity: "Medium",
    status: "Looking for Co-founder"
  },
  {
    id: 20,
    title: "Personalized Learning Path Generator",
    description: "AI-driven educational platform that creates customized learning experiences based on individual strengths, weaknesses, and learning pace.",
    category: "EdTech",
    tags: ["AI", "Education", "Personalization", "Adaptive Learning"],
    author: "Dr. Priya Sharma",
    publishedDate: "5 days ago",
    views: 1345,
    likes: 102,
    comments: 25,
    aiScore: 8.9,
    businessImpact: 8.6,
    complexity: "Medium",
    status: "Seeking Investment"
  },
  {
    id: 21,
    title: "AI-Powered Drug Discovery Platform",
    description: "Accelerate pharmaceutical research by using AI to predict molecular behavior and identify promising drug compounds faster than traditional methods.",
    category: "BioTech",
    tags: ["AI", "Drug Discovery", "Pharmaceuticals", "Research"],
    author: "Dr. Thomas Anderson",
    publishedDate: "1 week ago",
    views: 892,
    likes: 67,
    comments: 19,
    aiScore: 9.6,
    businessImpact: 9.8,
    complexity: "High",
    status: "In Development"
  },
  {
    id: 22,
    title: "Smart Parking Management System",
    description: "AI-enabled parking solution that predicts availability, guides drivers to open spots, and optimizes pricing based on demand.",
    category: "Smart City",
    tags: ["AI", "Parking", "Urban Planning", "IoT"],
    author: "Anna Kowalski",
    publishedDate: "2 days ago",
    views: 623,
    likes: 44,
    comments: 8,
    aiScore: 7.8,
    businessImpact: 8.1,
    complexity: "Medium",
    status: "Ready to Launch"
  },
  {
    id: 23,
    title: "AI Fraud Detection for E-commerce",
    description: "Real-time fraud detection system that analyzes transaction patterns, user behavior, and risk factors to prevent online payment fraud.",
    category: "FinTech",
    tags: ["AI", "Fraud Detection", "E-commerce", "Security"],
    author: "Ryan O'Connor",
    publishedDate: "4 days ago",
    views: 1145,
    likes: 89,
    comments: 21,
    aiScore: 9.1,
    businessImpact: 9.3,
    complexity: "High",
    status: "Looking for Co-founder"
  },
  {
    id: 24,
    title: "Intelligent Supply Chain Optimizer",
    description: "AI system that optimizes supply chain operations, predicts disruptions, and suggests alternative routes and suppliers in real-time.",
    category: "Logistics",
    tags: ["AI", "Supply Chain", "Logistics", "Optimization"],
    author: "Chen Wei",
    publishedDate: "3 days ago",
    views: 987,
    likes: 73,
    comments: 15,
    aiScore: 8.8,
    businessImpact: 9.2,
    complexity: "High",
    status: "Seeking Investment"
  },
  {
    id: 25,
    title: "AI-Enhanced Music Composition Tool",
    description: "Creative AI that helps musicians compose original music by suggesting melodies, harmonies, and arrangements in any genre or style.",
    category: "Music Tech",
    tags: ["AI", "Music", "Composition", "Creative Tools"],
    author: "Maya Patel",
    publishedDate: "1 day ago",
    views: 1456,
    likes: 112,
    comments: 27,
    aiScore: 7.6,
    businessImpact: 7.4,
    complexity: "Medium",
    status: "In Development"
  },
  {
    id: 26,
    title: "Smart Waste Management System",
    description: "IoT and AI-powered waste management that optimizes collection routes, predicts bin fill levels, and reduces operational costs.",
    category: "Smart City",
    tags: ["AI", "Waste Management", "IoT", "Sustainability"],
    author: "Erik Johansson",
    publishedDate: "5 days ago",
    views: 534,
    likes: 39,
    comments: 7,
    aiScore: 8.2,
    businessImpact: 8.4,
    complexity: "Medium",
    status: "Ready to Launch"
  },
  {
    id: 27,
    title: "AI-Powered Interior Design Assistant",
    description: "Virtual interior designer that creates room layouts, suggests furniture, and visualizes design changes using AR and AI algorithms.",
    category: "Design Tech",
    tags: ["AI", "Interior Design", "AR", "Visualization"],
    author: "Zoe Campbell",
    publishedDate: "6 days ago",
    views: 1789,
    likes: 134,
    comments: 32,
    aiScore: 7.7,
    businessImpact: 7.8,
    complexity: "Medium",
    status: "Looking for Co-founder"
  },
  {
    id: 28,
    title: "Predictive Healthcare Analytics Platform",
    description: "AI system that analyzes patient data to predict health risks, recommend preventive care, and optimize treatment plans.",
    category: "HealthTech",
    tags: ["AI", "Healthcare", "Predictive Analytics", "Patient Care"],
    author: "Dr. Samuel Lee",
    publishedDate: "2 days ago",
    views: 1432,
    likes: 108,
    comments: 26,
    aiScore: 9.4,
    businessImpact: 9.5,
    complexity: "High",
    status: "Seeking Investment"
  },
  {
    id: 29,
    title: "AI-Enhanced Food Safety Monitor",
    description: "Computer vision and AI system that monitors food safety in restaurants and food facilities, detecting contamination and safety violations.",
    category: "Food Safety",
    tags: ["AI", "Food Safety", "Computer Vision", "Compliance"],
    author: "Grace Liu",
    publishedDate: "4 days ago",
    views: 678,
    likes: 51,
    comments: 11,
    aiScore: 8.3,
    businessImpact: 8.7,
    complexity: "Medium",
    status: "In Development"
  },
  {
    id: 30,
    title: "Smart Contract Audit Platform",
    description: "AI-powered tool that automatically audits smart contracts for security vulnerabilities, gas optimization, and best practices.",
    category: "Blockchain",
    tags: ["AI", "Blockchain", "Smart Contracts", "Security"],
    author: "Alex Petrov",
    publishedDate: "1 week ago",
    views: 923,
    likes: 72,
    comments: 18,
    aiScore: 8.9,
    businessImpact: 8.5,
    complexity: "High",
    status: "Ready to Launch"
  },
  {
    id: 31,
    title: "AI-Powered Sleep Optimization App",
    description: "Personalized sleep improvement platform that analyzes sleep patterns, environmental factors, and lifestyle to optimize sleep quality.",
    category: "HealthTech",
    tags: ["AI", "Sleep", "Health", "Wearables"],
    author: "Dr. Lisa Brown",
    publishedDate: "3 days ago",
    views: 1234,
    likes: 94,
    comments: 22,
    aiScore: 8.1,
    businessImpact: 7.9,
    complexity: "Medium",
    status: "Looking for Co-founder"
  },
  {
    id: 32,
    title: "Intelligent Document Processing System",
    description: "AI platform that automatically extracts, processes, and organizes information from various document types for businesses.",
    category: "Business Tools",
    tags: ["AI", "Document Processing", "OCR", "Automation"],
    author: "Mohammed Al-Rashid",
    publishedDate: "2 days ago",
    views: 867,
    likes: 66,
    comments: 14,
    aiScore: 8.6,
    businessImpact: 8.8,
    complexity: "Medium",
    status: "Seeking Investment"
  },
  {
    id: 33,
    title: "AI-Enhanced Virtual Event Platform",
    description: "Immersive virtual event experience with AI-powered networking suggestions, personalized agendas, and real-time engagement analytics.",
    category: "Event Tech",
    tags: ["AI", "Virtual Events", "Networking", "Analytics"],
    author: "Carmen Rodriguez",
    publishedDate: "5 days ago",
    views: 1098,
    likes: 83,
    comments: 17,
    aiScore: 7.9,
    businessImpact: 8.2,
    complexity: "Medium",
    status: "In Development"
  },
  {
    id: 34,
    title: "Smart Quality Control for Manufacturing",
    description: "Computer vision AI that performs real-time quality inspection on manufacturing lines, detecting defects faster than human inspectors.",
    category: "Manufacturing",
    tags: ["AI", "Quality Control", "Computer Vision", "Manufacturing"],
    author: "Hiroshi Tanaka",
    publishedDate: "1 day ago",
    views: 745,
    likes: 57,
    comments: 12,
    aiScore: 8.7,
    businessImpact: 9.0,
    complexity: "High",
    status: "Ready to Launch"
  },
  {
    id: 35,
    title: "AI-Powered Language Translation Device",
    description: "Real-time translation device that uses advanced NLP to provide accurate, context-aware translations for business and travel.",
    category: "Language Tech",
    tags: ["AI", "Translation", "NLP", "Hardware"],
    author: "Elena Volkov",
    publishedDate: "6 days ago",
    views: 1567,
    likes: 119,
    comments: 28,
    aiScore: 8.4,
    businessImpact: 8.1,
    complexity: "High",
    status: "Looking for Co-founder"
  },
  {
    id: 36,
    title: "Intelligent Email Marketing Platform",
    description: "AI-driven email marketing tool that optimizes send times, personalizes content, and predicts customer engagement patterns.",
    category: "Marketing Tech",
    tags: ["AI", "Email Marketing", "Personalization", "Analytics"],
    author: "Jake Morrison",
    publishedDate: "3 days ago",
    views: 923,
    likes: 71,
    comments: 16,
    aiScore: 8.2,
    businessImpact: 8.4,
    complexity: "Medium",
    status: "Seeking Investment"
  },
  {
    id: 37,
    title: "AI-Enhanced Driver Safety System",
    description: "Advanced driver assistance system that uses computer vision and AI to prevent accidents, monitor driver fatigue, and provide safety alerts.",
    category: "Automotive",
    tags: ["AI", "Driver Safety", "Computer Vision", "Automotive"],
    author: "Lucas Schmidt",
    publishedDate: "4 days ago",
    views: 1345,
    likes: 102,
    comments: 24,
    aiScore: 8.8,
    businessImpact: 9.3,
    complexity: "High",
    status: "In Development"
  },
  {
    id: 38,
    title: "Smart Personalized Nutrition Planner",
    description: "AI nutritionist that creates personalized meal plans based on health goals, dietary restrictions, genetic factors, and preferences.",
    category: "HealthTech",
    tags: ["AI", "Nutrition", "Health", "Personalization"],
    author: "Dr. Sophia Adams",
    publishedDate: "2 days ago",
    views: 1876,
    likes: 142,
    comments: 35,
    aiScore: 8.3,
    businessImpact: 8.0,
    complexity: "Medium",
    status: "Ready to Launch"
  },
  {
    id: 39,
    title: "AI-Powered Real Estate Valuation Tool",
    description: "Automated property valuation system that analyzes market data, property features, and neighborhood trends for accurate pricing.",
    category: "PropTech",
    tags: ["AI", "Real Estate", "Valuation", "Market Analysis"],
    author: "Victoria Chen",
    publishedDate: "1 week ago",
    views: 1234,
    likes: 95,
    comments: 21,
    aiScore: 8.5,
    businessImpact: 8.9,
    complexity: "Medium",
    status: "Looking for Co-founder"
  },
  {
    id: 40,
    title: "Intelligent Social Media Scheduler",
    description: "AI tool that optimizes social media posting times, suggests content improvements, and analyzes engagement patterns across platforms.",
    category: "Social Media",
    tags: ["AI", "Social Media", "Scheduling", "Analytics"],
    author: "Tyler Brooks",
    publishedDate: "5 days ago",
    views: 1098,
    likes: 84,
    comments: 18,
    aiScore: 7.8,
    businessImpact: 7.7,
    complexity: "Low",
    status: "Seeking Investment"
  },
  {
    id: 41,
    title: "AI-Enhanced Fitness Personal Trainer",
    description: "Virtual personal trainer that uses computer vision to correct exercise form, track progress, and create personalized workout plans.",
    category: "FitnessTeach",
    tags: ["AI", "Fitness", "Computer Vision", "Personal Training"],
    author: "Marcus Johnson",
    publishedDate: "3 days ago",
    views: 1567,
    likes: 121,
    comments: 29,
    aiScore: 8.1,
    businessImpact: 7.8,
    complexity: "Medium",
    status: "In Development"
  },
  {
    id: 42,
    title: "Smart Weather Prediction for Agriculture",
    description: "Hyperlocal weather forecasting system that helps farmers make informed decisions about planting, irrigation, and harvesting.",
    category: "AgriTech",
    tags: ["AI", "Weather", "Agriculture", "Forecasting"],
    author: "Isabella Santos",
    publishedDate: "1 day ago",
    views: 678,
    likes: 52,
    comments: 10,
    aiScore: 8.4,
    businessImpact: 8.6,
    complexity: "High",
    status: "Ready to Launch"
  },
  {
    id: 43,
    title: "AI-Powered Mental Health Chatbot",
    description: "Therapeutic chatbot that provides cognitive behavioral therapy techniques, mood tracking, and crisis intervention support.",
    category: "HealthTech",
    tags: ["AI", "Mental Health", "Chatbot", "Therapy"],
    author: "Dr. Emily Watson",
    publishedDate: "4 days ago",
    views: 2134,
    likes: 167,
    comments: 41,
    aiScore: 8.9,
    businessImpact: 9.1,
    complexity: "High",
    status: "Looking for Co-founder"
  },
  {
    id: 44,
    title: "Intelligent Brand Monitoring Platform",
    description: "AI system that monitors brand mentions across the internet, analyzes sentiment, and provides actionable insights for reputation management.",
    category: "Marketing Tech",
    tags: ["AI", "Brand Monitoring", "Sentiment Analysis", "Reputation"],
    author: "Daniel Park",
    publishedDate: "6 days ago",
    views: 934,
    likes: 73,
    comments: 15,
    aiScore: 8.3,
    businessImpact: 8.2,
    complexity: "Medium",
    status: "Seeking Investment"
  },
  {
    id: 45,
    title: "AI-Enhanced 3D Printing Optimizer",
    description: "Smart 3D printing software that optimizes print settings, predicts failures, and ensures quality control through real-time monitoring.",
    category: "Manufacturing",
    tags: ["AI", "3D Printing", "Manufacturing", "Quality Control"],
    author: "Oliver Martinez",
    publishedDate: "2 days ago",
    views: 756,
    likes: 58,
    comments: 13,
    aiScore: 8.1,
    businessImpact: 7.9,
    complexity: "Medium",
    status: "In Development"
  },
  {
    id: 46,
    title: "Smart Legal Contract Analyzer",
    description: "AI tool that reviews legal contracts, identifies potential issues, suggests improvements, and ensures compliance with regulations.",
    category: "LegalTech",
    tags: ["AI", "Legal", "Contract Analysis", "Compliance"],
    author: "Rachel Goldman",
    publishedDate: "3 days ago",
    views: 1123,
    likes: 87,
    comments: 19,
    aiScore: 8.7,
    businessImpact: 8.8,
    complexity: "High",
    status: "Ready to Launch"
  },
  {
    id: 47,
    title: "AI-Powered Voice Assistant for Elderly",
    description: "Specialized voice assistant designed for elderly users, providing medication reminders, health monitoring, and emergency assistance.",
    category: "HealthTech",
    tags: ["AI", "Voice Assistant", "Elderly Care", "Health"],
    author: "Dr. Michael Foster",
    publishedDate: "5 days ago",
    views: 1345,
    likes: 104,
    comments: 25,
    aiScore: 8.2,
    businessImpact: 8.7,
    complexity: "Medium",
    status: "Looking for Co-founder"
  },
  {
    id: 48,
    title: "Intelligent Cybersecurity Training Platform",
    description: "AI-driven cybersecurity training that adapts to individual learning needs and simulates real-world attack scenarios.",
    category: "Cybersecurity",
    tags: ["AI", "Cybersecurity", "Training", "Education"],
    author: "Sarah Williams",
    publishedDate: "1 day ago",
    views: 867,
    likes: 67,
    comments: 14,
    aiScore: 8.4,
    businessImpact: 8.3,
    complexity: "Medium",
    status: "Seeking Investment"
  },
  {
    id: 49,
    title: "AI-Enhanced Podcast Discovery Engine",
    description: "Personalized podcast recommendation system that uses AI to match listeners with content based on interests, mood, and listening patterns.",
    category: "Media Tech",
    tags: ["AI", "Podcasts", "Recommendations", "Content Discovery"],
    author: "Emma Chang",
    publishedDate: "4 days ago",
    views: 1234,
    likes: 96,
    comments: 22,
    aiScore: 7.7,
    businessImpact: 7.5,
    complexity: "Medium",
    status: "In Development"
  },
  {
    id: 50,
    title: "Smart Water Quality Monitoring System",
    description: "IoT and AI-based water quality monitoring that detects contamination, predicts system failures, and ensures safe water supply.",
    category: "Environmental",
    tags: ["AI", "Water Quality", "IoT", "Environmental"],
    author: "Carlos Rivera",
    publishedDate: "6 days ago",
    views: 623,
    likes: 47,
    comments: 9,
    aiScore: 8.5,
    businessImpact: 8.9,
    complexity: "High",
    status: "Ready to Launch"
  }
];

const categories = ["All", "FinTech", "HealthTech", "EdTech", "AgriTech", "IoT", "Smart City", "Developer Tools", "Manufacturing", "LegalTech", "HR Tech", "Restaurant Tech", "Media Tech", "Customer Service", "E-commerce", "PropTech", "Cybersecurity", "BioTech", "Logistics", "Music Tech", "Design Tech", "Food Safety", "Blockchain", "Business Tools", "Event Tech", "Language Tech", "Marketing Tech", "Automotive", "FitnessTeach", "Social Media", "Environmental"];
const statuses = ["All", "Looking for Co-founder", "Seeking Investment", "In Development", "Ready to Launch"];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredIdeas = marketplaceIdeas
    .filter(idea => {
      const matchesCategory = selectedCategory === "All" || idea.category === selectedCategory;
      const matchesStatus = selectedStatus === "All" || idea.status === selectedStatus;
      const matchesSearch = searchTerm === "" || 
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case "newest": return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        case "popular": return b.likes - a.likes;
        case "aiScore": return b.aiScore - a.aiScore;
        default: return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Looking for Co-founder": return "bg-blue-100 text-blue-800";
      case "Seeking Investment": return "bg-green-100 text-green-800";
      case "In Development": return "bg-yellow-100 text-yellow-800";
      case "Ready to Launch": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch(complexity) {
      case "Low": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "High": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Startup Ideas Marketplace</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover innovative AI startup ideas from entrepreneurs worldwide. Find your next co-founder, investment opportunity, or inspiration.
            </p>
          </div>

          {/* Compact Search and Filters */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-3">
              {/* Compact Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ideas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Compact Filters */}
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
                <option value="aiScore">AI Score</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing {filteredIdeas.length} of {marketplaceIdeas.length} ideas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredIdeas.map((idea) => (
            <div key={idea.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {idea.category}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {idea.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {idea.description}
                </p>
              </div>

              {/* Tags */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Lightbulb className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-lg font-bold text-blue-600">{idea.aiScore}</span>
                    </div>
                    <p className="text-xs text-gray-500">AI Score</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-lg font-bold text-green-600">{idea.businessImpact}</span>
                    </div>
                    <p className="text-xs text-gray-500">Business Impact</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{idea.author.charAt(0)}</span>
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-900">{idea.author}</p>
                      <p className="text-xs text-gray-500">{idea.publishedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {idea.views}
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {idea.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {idea.comments}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(idea.status)}`}>
                      {idea.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(idea.complexity)}`}>
                      {idea.complexity}
                    </span>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Load More Ideas
          </Button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Have an AI Startup Idea?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our marketplace and connect with potential co-founders, investors, and collaborators from around the world.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
            <Zap className="mr-2 h-5 w-5" />
            Submit Your Idea
          </Button>
        </div>
      </div>
    </div>
  );
}