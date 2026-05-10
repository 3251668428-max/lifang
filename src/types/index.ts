export type Language = 'en' | 'ja' | 'ko';
export type NativeLanguage = 'zh' | 'en' | 'ja' | 'ko';
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type ModuleType = 'vocabulary' | 'grammar' | 'speaking' | 'listening';

export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  nativeLanguage: NativeLanguage;
  targetLanguages: Language[];
  currentLevel: Record<Language, Level>;
  streak: number;
  totalXp: number;
  badges: string[];
  createdAt: string;
  lastLoginAt: string;
  dailyGoal: number;
  todayMinutes: number;
}

export interface Course {
  id: string;
  language: Language;
  level: Level;
  title: string;
  description: string;
  coverImage: string;
  totalLessons: number;
  completedLessons: number;
  estimatedHours: number;
  learnersCount: number;
}

export interface Vocabulary {
  id: string;
  word: string;
  reading?: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
  audioUrl?: string;
}

export interface Grammar {
  id: string;
  rule: string;
  structure: string;
  examples: { text: string; translation: string }[];
  exercises: GrammarExercise[];
}

export interface GrammarExercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LearningRecord {
  id: string;
  userId: string;
  courseId: string;
  moduleType: ModuleType;
  lessonId: string;
  score: number;
  timeSpent: number;
  completedAt: string;
  mistakes: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'level' | 'completion' | 'social';
  requirement: number;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  language: Language;
  likes: number;
  comments: number;
  createdAt: string;
}

export interface SpeakingAttempt {
  id: string;
  vocabularyId: string;
  recordingUrl: string;
  score: number;
  feedback: string;
  createdAt: string;
}

export interface ListeningExercise {
  id: string;
  audioUrl: string;
  transcript: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}
