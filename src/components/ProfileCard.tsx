import React from 'react';
import { UserProfile } from '../types';
import { User, Mail, Briefcase, Bell, Moon, Lock } from 'lucide-react';

interface ProfileCardProps {
  profile: UserProfile;
  onUpdate: React.Dispatch<React.SetStateAction<UserProfile>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onUpdate, darkMode, setDarkMode }) => {
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
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
          <User className="h-10 w-10 text-blue-500 dark:text-blue-300" />
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-semibold">
            {profile.firstName} {profile.lastName}
          </h2>
          <p>{profile.occupation}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
              <span>{profile.occupation}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
                <span>Notifications</span>
              </div>
              <button
                onClick={() => handlePreferenceToggle('notifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  profile.preferences.notifications ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
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
              <div className="flex items-center">
                <Moon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
                <span>Dark Mode</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-300" />
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
                className="bg-gray-100 dark:bg-gray-800 border-0 rounded-md px-3 py-1 text-gray-700 dark:text-gray-300"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
