import { StressLevel, QuestionnaireResponse } from '../types';

export const analyzeFacialExpression = (imageData: string | null): Promise<{level: StressLevel, score: number}> => {
  return new Promise((resolve) => {
    
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 100);
      let level: StressLevel;
      
      if (randomScore < 30) level = 'low';
      else if (randomScore < 60) level = 'moderate';
      else if (randomScore < 85) level = 'high';
      else level = 'severe';
      
      resolve({ level, score: randomScore });
    }, 1500);
  });
};

export const analyzeQuestionnaire = (responses: QuestionnaireResponse[]): Promise<{level: StressLevel, score: number}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalPossibleScore = responses.length * 5; // Max score per question is 5
      const actualScore = responses.reduce((sum, response) => sum + response.answer, 0);
      const percentageScore = (actualScore / totalPossibleScore) * 100;
      
      let level: StressLevel;
      if (percentageScore < 30) level = 'low';
      else if (percentageScore < 60) level = 'moderate';
      else if (percentageScore < 85) level = 'high';
      else level = 'severe';
      
      resolve({ level, score: percentageScore });
    }, 1000);
  });
};

export const getRecommendations = (level: StressLevel): string[] => {
  const recommendations = {
    low: [
      "Maintain your current healthy routines",
      "Practice regular mindfulness to stay centered",
      "Continue with moderate exercise 3-5 times weekly"
    ],
    moderate: [
      "Take short breaks throughout your day",
      "Try guided meditation for 10 minutes daily",
      "Ensure you're getting 7-8 hours of sleep",
      "Consider limiting caffeine intake"
    ],
    high: [
      "Prioritize sleep and rest periods",
      "Practice deep breathing exercises multiple times daily",
      "Reduce commitments where possible",
      "Engage in physical activity to release tension",
      "Consider speaking with a trusted friend or family member"
    ],
    severe: [
      "Speak with a healthcare professional",
      "Focus on basic self-care: sleep, nutrition, and hydration",
      "Try progressive muscle relaxation techniques",
      "Take time off from stressful activities if possible",
      "Connect with supportive friends or family",
      "Consider professional mental health resources"
    ]
  };
  
  return recommendations[level];
};