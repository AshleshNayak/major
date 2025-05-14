import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import StressChart from '../components/StressChart';
import { UserProfile } from '../types';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    firstName: 'Thomas',
    lastName: 'Shelby',
    email: 'thomasshelby@gmail.com',
    age: 30,
    gender: 'male',
    occupation: 'Businessman & Politician',
    stressHistory: [
      { level: 'low', score: 25, timestamp: '2024-03-01T10:00:00Z' },
      { level: 'moderate', score: 45, timestamp: '2024-03-05T10:00:00Z' },
      { level: 'high', score: 75, timestamp: '2024-03-10T10:00:00Z' },
      { level: 'moderate', score: 55, timestamp: '2024-03-15T10:00:00Z' },
      { level: 'low', score: 30, timestamp: '2024-03-20T10:00:00Z' },
    ],
    preferences: {
      notifications: true,
      darkMode: false,
      emailUpdates: true,
      privacyLevel: 'private'
    }
  });

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account settings and view your stress history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProfileCard profile={profile} onUpdate={setProfile} />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Average Stress Level</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(profile.stressHistory.reduce((acc, curr) => acc + curr.score, 0) / profile.stressHistory.length)}%
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Assessments Taken</p>
                <p className="text-2xl font-bold text-green-600">{profile.stressHistory.length}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Last Assessment</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Date(profile.stressHistory[profile.stressHistory.length - 1].timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Stress History</h2>
        <StressChart data={profile.stressHistory} />
      </div>
    </div>
  );
};

export default Profile;