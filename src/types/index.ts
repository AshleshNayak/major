export type StressLevel = 'low' | 'moderate' | 'high' | 'severe';

export interface StressData {
  level: StressLevel;
  score: number;
  timestamp: string;
}

export interface QuestionnaireResponse {
  id: number;
  question: string;
  answer: number; 
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  occupation: string;
  stressHistory: StressData[];
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    emailUpdates: boolean;
    privacyLevel: 'public' | 'private';
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
}