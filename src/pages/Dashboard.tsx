import React, { useState, useEffect } from 'react';
import StressLevelIndicator from '../components/StressLevelIndicator';
import StressChart from '../components/StressChart';
import { StressData, StressLevel } from '../types';
import { Calendar, Clock, TrendingUp as Trending } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stressHistory, setStressHistory] = useState<StressData[]>([]);
  const [currentStress, setCurrentStress] = useState<{ level: StressLevel; score: number }>({
    level: 'moderate',
    score: 45,
  });

  useEffect(() => {
    const generateMockData = () => {
      const mockData: StressData[] = [];
      const today = new Date();

      for (let i = 14; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        let baseScore = 50;
        const day = date.getDay();
        if (day >= 1 && day <= 5) {
          baseScore += 10;
        }

        const randomFactor = Math.random() * 30 - 15;
        const score = Math.max(0, Math.min(100, baseScore + randomFactor));
        let level: StressLevel;
        if (score < 30) level = 'low';
        else if (score < 60) level = 'moderate';
        else if (score < 85) level = 'high';
        else level = 'severe';

        mockData.push({
          level,
          score,
          timestamp: date.toISOString(),
        });
      }

      return mockData;
    };

    setStressHistory(generateMockData());
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTrendData = () => {
    if (stressHistory.length < 2) return { direction: 'stable', percentage: 0 };

    const recent = stressHistory.slice(-5);
    const oldAvg = (recent[0].score + recent[1].score) / 2;
    const newAvg = (recent[3].score + recent[4].score) / 2;

    const difference = newAvg - oldAvg;
    const percentageChange = Math.abs(Math.round((difference / oldAvg) * 100));

    return {
      direction: difference > 3 ? 'up' : difference < -3 ? 'down' : 'stable',
      percentage: percentageChange,
    };
  };

  const trend = getTrendData();

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Stress Dashboard</h1>
        <p className="text-gray-600">Monitor and manage your stress levels effectively.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Current Stress Level</h2>
          <div className="flex flex-col items-center mb-4">
            <div className="mb-4">
              <StressLevelIndicator level={currentStress.level} score={currentStress.score} size="lg" />
            </div>
            <div className="text-center mt-2">
              <p className="text-gray-500 flex items-center justify-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Last updated: Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">7-day trend</span>
              <div
                className={`flex items-center ${
                  trend.direction === 'up'
                    ? 'text-red-500'
                    : trend.direction === 'down'
                    ? 'text-green-500'
                    : 'text-gray-500'
                }`}
              >
                <Trending className="h-4 w-4 mr-1" />
                <span>{trend.direction === 'stable' ? 'Stable' : `${trend.percentage}% ${trend.direction}`}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Latest Assessment</h2>
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-gray-800 mb-1">{Math.round(currentStress.score)}/100</p>
            <p className="text-gray-600">Stress Score</p>
          </div>
          <div className="space-y-3 mt-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Physical indicators</span>
              <span className="font-medium">{Math.round(currentStress.score * 0.7)}/70</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Emotional indicators</span>
              <span className="font-medium">{Math.round(currentStress.score * 0.3)}/30</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Assessed: {formatDate(new Date().toISOString())}</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Take New Assessment
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <a
              href="#resources"
              className="text-blue-500 hover:text-blue-700 transition-colors flex items-center justify-center"
            >
              View all stress management resources
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <StressChart data={stressHistory} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
