import React, { useState } from 'react';
import { QuestionnaireResponse } from '../types';
import { CheckCircle, AlertCircle } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "How often have you felt that you were unable to control the important things in your life?",
  },
  {
    id: 2,
    question: "How often have you felt nervous and stressed?",
  },
  {
    id: 3,
    question: "How often have you found that you could not cope with all the things that you had to do?",
  },
  {
    id: 4,
    question: "How often have you felt difficulties were piling up so high that you could not overcome them?",
  },
  {
    id: 5,
    question: "How often have you felt confident about your ability to handle your personal problems?",
  },
  {
    id: 6,
    question: "How often have you been angered because of things that were outside of your control?",
  },
  {
    id: 7,
    question: "How often have you felt that things were going your way?",
  },
  {
    id: 8,
    question: "How often have you had trouble sleeping because of your concerns?",
  },
];

interface AssessmentQuestionnaireProps {
  onSubmit: (responses: QuestionnaireResponse[]) => void;
  isProcessing: boolean;
}

const AssessmentQuestionnaire: React.FC<AssessmentQuestionnaireProps> = ({ onSubmit, isProcessing }) => {
  const [responses, setResponses] = useState<QuestionnaireResponse[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleResponse = (answer: number) => {
    const updatedResponses = [...responses];
    updatedResponses[currentQuestion] = {
      id: QUESTIONS[currentQuestion].id,
      question: QUESTIONS[currentQuestion].question,
      answer
    };
    
    setResponses(updatedResponses);
    
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSubmit(updatedResponses);
    }
  };

  const renderRatingLabels = () => {
    return (
      <div className="flex justify-between text-xs text-gray-600 w-full px-2 mt-1">
        <span>Never</span>
        <span>Rarely</span>
        <span>Sometimes</span>
        <span>Often</span>
        <span>Very Often</span>
      </div>
    );
  };

  if (currentQuestion >= QUESTIONS.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center min-h-[300px]">
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-700">Analyzing your responses...</p>
          </>
        ) : (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">Thank You!</h3>
            <p className="text-gray-600 text-center">
              Your responses have been processed. View your results above.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-800">Stress Assessment</h3>
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {QUESTIONS.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-8">
        <p className="text-gray-700 text-lg mb-6">
          {QUESTIONS[currentQuestion].question}
        </p>
        
        <div className="space-y-6">
          <div className="flex justify-between gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleResponse(rating)}
                className={`flex-1 py-3 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-100 text-lg font-medium`}
              >
                {rating}
              </button>
            ))}
          </div>
          {renderRatingLabels()}
        </div>
      </div>
      
      <div className="text-sm text-gray-500 flex items-start">
        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-500" />
        <p>
          Please answer honestly for the most accurate assessment. Your responses are confidential.
        </p>
      </div>
    </div>
  );
};

export default AssessmentQuestionnaire;