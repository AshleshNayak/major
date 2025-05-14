import React from 'react';
import { UserProfile } from '../types';
import { User, Mail, Briefcase, Bell, Moon, Lock } from 'lucide-react';

interface ProfileCardProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onUpdate }) => {
  const handlePreferenceToggle = (key: keyof UserProfile['preferences']) => {
    onUpdate({
      ...profile,
      preferences: {
        ...profile.preferences,
        [key]: !profile.preferences[key]
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="h-10 w-10 text-blue-500" />
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-gray-600">{profile.occupation}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <Mail className="h-5 w-5 mr-2 text-blue-500" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
              <span>{profile.occupation}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-700">
                <Bell className="h-5 w-5 mr-2 text-blue-500" />
                <span>Notifications</span>
              </div>
              <button
                onClick={() => handlePreferenceToggle('notifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  profile.preferences.notifications ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    profile.preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-700">
                <Moon className="h-5 w-5 mr-2 text-blue-500" />
                <span>Dark Mode</span>
              </div>
              <button
                onClick={() => handlePreferenceToggle('darkMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  profile.preferences.darkMode ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    profile.preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-700">
                <Lock className="h-5 w-5 mr-2 text-blue-500" />
                <span>Privacy</span>
              </div>
              <select
                value={profile.preferences.privacyLevel}
                onChange={(e) => onUpdate({
                  ...profile,
                  preferences: {
                    ...profile.preferences,
                    privacyLevel: e.target.value as 'public' | 'private'
                  }
                })}
                className="bg-gray-100 border-0 rounded-md px-3 py-1 text-gray-700"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;