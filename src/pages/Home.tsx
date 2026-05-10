import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import { useCourseStore } from '../store/courseStore';
import { useLearningStore } from '../store/learningStore';
import { languageNames, languageFlags } from '../data/courses';
import {
  BookOpen,
  Clock,
  Target,
  Flame,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Award,
  Play
} from 'lucide-react';
import type { Language } from '../types';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { courses, getFilteredCourses } = useCourseStore();
  const { getModuleStats } = useLearningStore();

  const recommendedCourses = getFilteredCourses().slice(0, 3);
  const dailyProgress = user ? Math.min((user.todayMinutes / user.dailyGoal) * 100, 100) : 0;
  const vocabularyStats = getModuleStats('vocabulary');

  const languageColors: Record<Language, string> = {
    en: 'from-blue-500 to-cyan-500',
    ja: 'from-pink-500 to-rose-500',
    ko: 'from-purple-500 to-indigo-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 p-6 lg:p-8">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="max-w-7xl mx-auto"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-primary-900 mb-2">
            你好，{user?.username || '学习者'} 👋
          </h1>
          <p className="text-primary-600">继续你的语言学习之旅吧！</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-gradient-to-r from-accent-green/20 to-emerald-500/20 rounded-3xl p-6 backdrop-blur-xl border border-accent-green/20"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-primary-900 mb-1">今日目标</h2>
                <p className="text-primary-600 text-sm">每天进步一点点</p>
              </div>
              <div className="relative w-20 h-20">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-primary-200"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${dailyProgress * 2.26} 226`}
                    strokeLinecap="round"
                    className="text-accent-green"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-900">{Math.round(dailyProgress)}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-accent-green mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">学习时长</span>
                </div>
                <p className="text-2xl font-bold text-primary-900">{user?.todayMinutes || 0}<span className="text-sm font-normal text-primary-600 ml-1">分钟</span></p>
              </div>

              <div className="bg-white/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-accent-amber mb-2">
                  <Flame className="w-4 h-4" />
                  <span className="text-sm font-medium">连续打卡</span>
                </div>
                <p className="text-2xl font-bold text-primary-900">{user?.streak || 0}<span className="text-sm font-normal text-primary-600 ml-1">天</span></p>
              </div>

              <div className="bg-white/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-accent-pink mb-2">
                  <Target className="w-4 h-4" />
                  <span className="text-sm font-medium">目标进度</span>
                </div>
                <p className="text-2xl font-bold text-primary-900">{user?.dailyGoal || 30}<span className="text-sm font-normal text-primary-600 ml-1">分钟</span></p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-primary-900 to-purple-900 rounded-3xl p-6 text-white"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent-amber" />
              <h2 className="text-lg font-semibold">学习总览</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-primary-300">总经验值</span>
                <span className="font-bold text-accent-amber">{user?.totalXp || 0} XP</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-primary-300">已获徽章</span>
                <span className="font-bold text-white">{user?.badges?.length || 0} 个</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-primary-300">学习等级</span>
                <span className="font-bold text-accent-green">Lv.{Math.floor((user?.totalXp || 0) / 100) + 1}</span>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-primary-300">单词正确率</span>
                  <span className="font-bold text-white">{vocabularyStats.accuracy}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.section variants={fadeInUp} transition={{ delay: 0.3 }} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary-900">推荐课程</h2>
              <p className="text-primary-600">根据你的学习目标精选</p>
            </div>
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center gap-2 text-accent-green hover:text-emerald-600 font-medium transition-colors"
            >
              查看全部
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/courses`)}
              >
                <div className={`h-32 bg-gradient-to-br ${languageColors[course.language]} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                    {languageFlags[course.language]} {course.level}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-primary-900 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-primary-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-primary-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.totalLessons}课
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.estimatedHours}h
                      </span>
                    </div>
                    <span className="text-primary-400">{course.learnersCount.toLocaleString()}人在学</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fadeInUp} transition={{ delay: 0.4 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary-900">学习模块</h2>
              <p className="text-primary-600">选择你喜欢的方式学习</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BookOpen, label: '单词记忆', color: 'from-emerald-500 to-teal-500', path: '/courses' },
              { icon: TrendingUp, label: '语法练习', color: 'from-blue-500 to-indigo-500', path: '/courses' },
              { icon: Award, label: '口语跟读', color: 'from-pink-500 to-rose-500', path: '/courses' },
              { icon: Target, label: '听力训练', color: 'from-amber-500 to-orange-500', path: '/courses' },
            ].map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.button
                  key={module.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => navigate(module.path)}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group text-left"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-primary-900">{module.label}</h3>
                  <p className="text-primary-500 text-sm mt-1">开始学习</p>
                </motion.button>
              );
            })}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
