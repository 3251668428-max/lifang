import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LearningRecord, ModuleType } from '../types';

interface LearningState {
  records: LearningRecord[];
  currentModule: ModuleType | null;
  currentCourseId: string | null;
  mistakes: string[];
  vocabularyProgress: Record<string, number>;
  grammarProgress: Record<string, number>;
  addRecord: (record: Omit<LearningRecord, 'id'>) => void;
  setCurrentModule: (module: ModuleType | null, courseId: string | null) => void;
  addMistake: (mistake: string) => void;
  updateVocabularyProgress: (vocabId: string, progress: number) => void;
  updateGrammarProgress: (grammarId: string, progress: number) => void;
  getModuleStats: (moduleType: ModuleType) => { total: number; correct: number; accuracy: number };
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      records: [],
      currentModule: null,
      currentCourseId: null,
      mistakes: [],
      vocabularyProgress: {},
      grammarProgress: {},

      addRecord: (record) => {
        const newRecord: LearningRecord = {
          ...record,
          id: Math.random().toString(36).substring(2, 15),
        };
        set((state) => ({ records: [...state.records, newRecord] }));
      },

      setCurrentModule: (module, courseId) => {
        set({ currentModule: module, currentCourseId: courseId });
      },

      addMistake: (mistake) => {
        set((state) => ({ mistakes: [...state.mistakes, mistake] }));
      },

      updateVocabularyProgress: (vocabId, progress) => {
        set((state) => ({
          vocabularyProgress: { ...state.vocabularyProgress, [vocabId]: progress },
        }));
      },

      updateGrammarProgress: (grammarId, progress) => {
        set((state) => ({
          grammarProgress: { ...state.grammarProgress, [grammarId]: progress },
        }));
      },

      getModuleStats: (moduleType) => {
        const { records } = get();
        const moduleRecords = records.filter((r) => r.moduleType === moduleType);
        const total = moduleRecords.length;
        const correct = moduleRecords.filter((r) => r.score >= 80).length;
        const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
        return { total, correct, accuracy };
      },
    }),
    {
      name: 'linguaflow-learning',
    }
  )
);
