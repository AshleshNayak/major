import React from 'react';
import { Lightbulb, ChevronRight } from 'lucide-react';

interface RecommendationCardProps {
  recommendations: string[];
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendations }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Recommendations</h2>
      </div>
      
      <ul className="space-y-3">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start">
            <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <span className="ml-2 text-gray-700">{rec}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500 italic">
          These recommendations are based on your current stress assessment and are not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default RecommendationCard;