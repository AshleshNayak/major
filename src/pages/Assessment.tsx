import React, { useState } from 'react';
import AssessmentQuestionnaire from '../components/AssessmentQuestionnaire';
import RecommendationCard from '../components/RecommendationCard';
import StressLevelIndicator from '../components/StressLevelIndicator';
import { QuestionnaireResponse, StressLevel } from '../types';
import { analyzeQuestionnaire, getRecommendations } from '../utils/mockML';
import { Activity, BarChart2, CheckCircle, FileText } from 'lucide-react';

const Assessment: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<{
    level: StressLevel;
    score: number;
    recommendations: string[];
  } | null>(null);

  const handleQuestionnaireSubmit = async (responses: QuestionnaireResponse[]) => {
    setIsProcessing(true);
    try {
      const result = await analyzeQuestionnaire(responses);
      setResults({
        level: result.level,
        score: result.score,
        recommendations: getRecommendations(result.level)
      });
    } catch (error) {
      console.error('Error analyzing questionnaire:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAssessment = () => {
    setResults(null);
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Stress Assessment</h1>
        <p className="text-gray-600">Analyze your current stress levels and get personalized recommendations.</p>
      </div>

      {results ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Results</h2>

              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full flex items-center justify-center border-8 border-gray-100">
                    <span className="text-3xl font-bold text-gray-800">{Math.round(results.score)}</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <StressLevelIndicator level={results.level} score={results.score} size="md" />
                  </div>
                </div>

                <p className="text-gray-600 text-center mt-4">
                  Your stress assessment indicates a {results.level} level of stress.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-700">Stress Score</span>
                  </div>
                  <span className="font-medium">{Math.round(results.score)}/100</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">Assessment Type</span>
                  </div>
                  <span className="font-medium capitalize">questionnaire</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-md">
                  <div className="flex items-center">
                    <BarChart2 className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-gray-700">Compared to Average</span>
                  </div>
                  <span className="font-medium">
                    {results.score > 60 ? 'Above' : results.score < 40 ? 'Below' : 'Average'}
                  </span>
                </div>
              </div>

              <button
                onClick={resetAssessment}
                className="w-full mt-8 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Take Another Assessment
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <RecommendationCard recommendations={results.recommendations} />

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Understanding Your Results</h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">
                  Your stress score of <strong>{Math.round(results.score)}</strong> indicates a <strong>{results.level}</strong> level of stress. Here's what this means:
                </p>

                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-md">
                  {results.level === 'low' && (
                    <p className="text-gray-700">
                      You're managing stress well. Continue your healthy habits and self-care routines to maintain this balance.
                    </p>
                  )}

                  {results.level === 'moderate' && (
                    <p className="text-gray-700">
                      You're experiencing a manageable level of stress, but it's important to monitor your stress triggers and practice regular relaxation techniques.
                    </p>
                  )}

                  {results.level === 'high' && (
                    <p className="text-gray-700">
                      Your stress levels are elevated. This can impact various aspects of your health over time. The recommendations provided can help reduce your stress levels.
                    </p>
                  )}

                  {results.level === 'severe' && (
                    <p className="text-gray-700">
                      Your stress levels are concerning. Chronic high stress can have significant negative impacts on physical and mental health. Consider speaking with a healthcare professional.
                    </p>
                  )}
                </div>

                <p className="text-gray-700">
                  Remember that stress is a natural response, but prolonged stress can affect your physical and mental wellbeing. The recommendations provided are designed to help you manage and reduce your current stress levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AssessmentQuestionnaire 
          onSubmit={handleQuestionnaireSubmit} 
          isProcessing={isProcessing} 
        />
      )}
    </div>
  );
};

export default Assessment;




















