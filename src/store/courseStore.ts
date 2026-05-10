import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Course, Language, Level } from '../types';
import { courses as mockCourses } from '../data/courses';

interface CourseState {
  courses: Course[];
  selectedLanguage: Language;
  selectedLevel: Level | 'all';
  enrolledCourses: string[];
  courseProgress: Record<string, number>;
  selectLanguage: (language: Language) => void;
  selectLevel: (level: Level | 'all') => void;
  enrollCourse: (courseId: string) => void;
  updateProgress: (courseId: string, progress: number) => void;
  getFilteredCourses: () => Course[];
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: mockCourses,
      selectedLanguage: 'en',
      selectedLevel: 'all',
      enrolledCourses: [],
      courseProgress: {},

      selectLanguage: (language: Language) => {
        set({ selectedLanguage: language });
      },

      selectLevel: (level: Level | 'all') => {
        set({ selectedLevel: level });
      },

      enrollCourse: (courseId: string) => {
        const { enrolledCourses } = get();
        if (!enrolledCourses.includes(courseId)) {
          set({ enrolledCourses: [...enrolledCourses, courseId] });
        }
      },

      updateProgress: (courseId: string, progress: number) => {
        const { courseProgress } = get();
        set({ courseProgress: { ...courseProgress, [courseId]: progress } });
      },

      getFilteredCourses: () => {
        const { courses, selectedLanguage, selectedLevel } = get();
        return courses.filter(course => {
          const languageMatch = course.language === selectedLanguage;
          const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
          return languageMatch && levelMatch;
        });
      },
    }),
    {
      name: 'linguaflow-courses',
    }
  )
);
