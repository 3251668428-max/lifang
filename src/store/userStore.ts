import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Language, Level } from '../types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProgress: (xp: number) => void;
  updateStreak: () => void;
  updateTodayMinutes: (minutes: number) => void;
  addBadge: (badgeId: string) => void;
  setDailyGoal: (goal: number) => void;
  updateLevel: (language: Language, level: Level) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const storedUsers = JSON.parse(localStorage.getItem('linguaflow_users') || '[]');
        const foundUser = storedUsers.find((u: User) => u.email === email && u.id.startsWith('mock_'));
        
        if (foundUser) {
          const user = { ...foundUser, lastLoginAt: new Date().toISOString() };
          set({ user, isAuthenticated: true });
          return true;
        }
        
        if (email && password) {
          const newUser: User = {
            id: `mock_${generateId()}`,
            email,
            username: email.split('@')[0],
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            nativeLanguage: 'zh',
            targetLanguages: ['en'],
            currentLevel: { en: 'A1', ja: 'A1', ko: 'A1' },
            streak: 0,
            totalXp: 0,
            badges: [],
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
            dailyGoal: 30,
            todayMinutes: 0,
          };
          
          set({ user: newUser, isAuthenticated: true });
          return true;
        }
        
        return false;
      },

      register: async (email: string, username: string, password: string) => {
        if (email && username && password) {
          const newUser: User = {
            id: `mock_${generateId()}`,
            email,
            username,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
            nativeLanguage: 'zh',
            targetLanguages: ['en'],
            currentLevel: { en: 'A1', ja: 'A1', ko: 'A1' },
            streak: 0,
            totalXp: 0,
            badges: [],
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
            dailyGoal: 30,
            todayMinutes: 0,
          };
          
          set({ user: newUser, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProgress: (xp: number) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, totalXp: user.totalXp + xp } });
        }
      },

      updateStreak: () => {
        const { user } = get();
        if (user) {
          const today = new Date().toDateString();
          const lastLogin = user.lastLoginAt ? new Date(user.lastLoginAt).toDateString() : null;
          
          if (lastLogin !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastLogin === yesterday.toDateString()) {
              set({ user: { ...user, streak: user.streak + 1 } });
            } else if (lastLogin !== today) {
              set({ user: { ...user, streak: 1 } });
            }
          }
        }
      },

      updateTodayMinutes: (minutes: number) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, todayMinutes: user.todayMinutes + minutes } });
        }
      },

      addBadge: (badgeId: string) => {
        const { user } = get();
        if (user && !user.badges.includes(badgeId)) {
          set({ user: { ...user, badges: [...user.badges, badgeId] } });
        }
      },

      setDailyGoal: (goal: number) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, dailyGoal: goal } });
        }
      },

      updateLevel: (language: Language, level: Level) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, currentLevel: { ...user.currentLevel, [language]: level } } });
        }
      },
    }),
    {
      name: 'linguaflow-user',
    }
  )
);
