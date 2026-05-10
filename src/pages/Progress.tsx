import { motion } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import { useLearningStore } from '../store/learningStore';
import { useCourseStore } from '../store/courseStore';
import { languageNames, languageFlags } from '../data/courses';
import {
  BarChart3,
  Target,
  Clock,
  TrendingUp,
  Calendar,
  BookOpen,
  Award,
  Flame
} from 'lucide-react';
import type { Language } from '../types';

const levelRanges = {
  A1: { min: 0, max: 200 },
  A2: { min: 200, max: 400 },
  B1: { min: 400, max: 600 },
  B2: { min: 600, max: 800 },
  C1: { min: 800, max: 950 },
  C2: { min: 950, max: 1000 },
};

export default function Progress() {
  const user = useUserStore((state) => state.user);
  const { records, getModuleStats } = useLearningStore();
  const { enrolledCourses } = useCourseStore();

  const vocabularyStats = getModuleStats('vocabulary');
  const grammarStats = getModuleStats('grammar');
  const speakingStats = getModuleStats('speaking');
  const listeningStats = getModuleStats('listening');

  const calculateLevel = (xp: number) => {
    const levels = Object.entries(levelRanges);
    for (const [level, range] of levels) {
      if (xp >= range.min && xp < range.max) {
        return { level, progress: ((xp - range.min) / (range.max - range.min)) * 100 };
      }
    }
    return { level: 'C2', progress: 100 };
  };

  const mainLevel = calculateLevel(user?.totalXp || 0);

  const studyDays = [
    { day: '一', minutes: 25, active: true },
    { day: '二', minutes: 40, active: true },
    { day: '三', minutes: 15, active: false },
    { day: '四', minutes: 35, active: true },
    { day: '五', minutes: 50, active: true },
    { day: '六', minutes: 20, active: true },
    { day: '日', minutes: 0, active: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-bold text-primary-900 mb-2">学习进度</h1>
          <p className="text-primary-600">追踪你的学习旅程</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-primary-900">能力雷达图</h2>
              <div className="flex items-center gap-2 text-accent-green">
                <Flame className="w-5 h-5" />
                <span className="font-medium">连续 {user?.streak || 0} 天</span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: '词汇量', value: vocabularyStats.accuracy, icon: BookOpen, color: 'emerald' },
                { label: '语法', value: grammarStats.accuracy, icon: Target, color: 'blue' },
                { label: '口语', value: speakingStats.accuracy || 75, icon: Award, color: 'pink' },
                { label: '听力', value: listeningStats.accuracy || 70, icon: BarChart3, color: 'amber' },
              ].map((skill, index) => {
                const Icon = skill.icon;
                const colorClasses: Record<string, string> = {
                  emerald: 'bg-emerald-500',
                  blue: 'bg-blue-500',
                  pink: 'bg-pink-500',
                  amber: 'bg-amber-500',
                };
                return (
                  <motion.div
                    key={skill.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-primary-50 rounded-2xl p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 ${colorClasses[skill.color]} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-primary-900">{skill.value}%</span>
                    </div>
                    <p className="text-sm text-primary-600">{skill.label}</p>
                    <div className="mt-2 h-2 bg-primary-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colorClasses[skill.color]} rounded-full`}
                        style={{ width: `${skill.value}%` }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-accent-green to-emerald-500 rounded-3xl p-6 text-white"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5" />
              <h2 className="text-lg font-semibold">当前等级</h2>
            </div>

            <div className="text-center mb-6">
              <div className="text-6xl font-bold mb-2">{mainLevel.level}</div>
              <p className="text-white/80">CEFR 标准</p>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>升级进度</span>
                <span>{Math.round(mainLevel.progress)}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${mainLevel.progress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
              <div>
                <p className="text-white/60 text-sm">当前经验</p>
                <p className="text-xl font-bold">{user?.totalXp || 0} XP</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">下一等级</p>
                <p className="text-xl font-bold">A2</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-primary-900">本周学习时长</h2>
              <Calendar className="w-5 h-5 text-primary-400" />
            </div>

            <div className="flex items-end justify-between h-40 gap-2">
              {studyDays.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ delay: 0.05 * index }}
                  className="flex-1 flex flex-col items-center"
                >
                  <div
                    className={`w-full rounded-t-lg transition-all ${
                      day.active ? 'bg-gradient-to-t from-accent-green to-emerald-400' : 'bg-primary-200'
                    }`}
                    style={{ height: `${Math.max((day.minutes / 60) * 100, 20)}%` }}
                  />
                  <span className="text-xs text-primary-500 mt-2">{day.day}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-primary-600">本周学习 185 分钟</span>
              <span className="text-accent-green font-medium">+12% vs 上周</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-primary-900">学习统计</h2>
              <TrendingUp className="w-5 h-5 text-accent-green" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-primary-900">学习课程</p>
                    <p className="text-sm text-primary-500">{enrolledCourses.length} 门课程</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-primary-900">{enrolledCourses.length}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-primary-900">完成练习</p>
                    <p className="text-sm text-primary-500">本周完成</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-primary-900">{records.length}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-primary-900">总学习时长</p>
                    <p className="text-sm text-primary-500">累计学习</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-primary-900">{user?.todayMinutes || 0}m</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-primary-900 mb-6">各语言学习情况</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['en', 'ja', 'ko'] as Language[]).map((lang) => (
              <div key={lang} className="bg-primary-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{languageFlags[lang]}</span>
                  <div>
                    <p className="font-medium text-primary-900">{languageNames[lang]}</p>
                    <p className="text-sm text-primary-500">等级 {user?.currentLevel[lang] || 'A1'}</p>
                  </div>
                </div>
                <div className="h-2 bg-primary-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-green to-emerald-400 rounded-full"
                    style={{ width: '30%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
