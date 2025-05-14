import React from 'react';
import { StressLevel } from '../types';
import { Activity } from 'lucide-react';

interface StressLevelIndicatorProps {
  level: StressLevel;
  score: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StressLevelIndicator: React.FC<StressLevelIndicatorProps> = ({ 
  level, 
  score, 
  showLabel = true,
  size = 'md'
}) => {
  const getColorClass = () => {
    switch (level) {
      case 'low':
        return 'text-green-500';
      case 'moderate':
        return 'text-yellow-500';
      case 'high':
        return 'text-orange-500';
      case 'severe':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getBgColorClass = () => {
    switch (level) {
      case 'low':
        return 'bg-green-100';
      case 'moderate':
        return 'bg-yellow-100';
      case 'high':
        return 'bg-orange-100';
      case 'severe':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4 mr-1 text-xs';
      case 'lg':
        return 'h-8 w-8 mr-2 text-xl';
      case 'md':
      default:
        return 'h-6 w-6 mr-2 text-base';
    }
  };

  return (
    <div className={`flex items-center ${getBgColorClass()} rounded-full px-3 py-1 inline-flex`}>
      <Activity className={`${getColorClass()} ${getSizeClass()}`} />
      {showLabel && (
        <span className={`${getColorClass()} font-medium capitalize`}>
          {level} ({Math.round(score)}%)
        </span>
      )}
    </div>
  );
};

export default StressLevelIndicator;