import { motion } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import { useCourseStore } from '../store/courseStore';
import { languageNames, languageFlags } from '../data/courses';
import {
  Compass,
  Target,
  BookOpen,
  TrendingUp,
  Clock,
  ChevronRight,
  Sparkles,
  Zap,
  Award
} from 'lucide-react';
import type { Language } from '../types';

export default function Recommendations() {
  const user = useUserStore((state) => state.user);
  const { courses } = useCourseStore();

  const recommendedCourses = courses.filter((c) => c.level === 'A1').slice(0, 3);

  const weaknesses = [
    { skill: '语法', score: 65, suggestion: '建议加强基础语法练习' },
    { skill: '听力', score: 58, suggestion: '每天进行15分钟听力训练' },
    { skill: '口语', score: 72, suggestion: '尝试跟读练习提升发音' },
  ];

  const learningPath = [
    { step: 1, title: '掌握基础词汇', status: 'completed', icon: BookOpen },
    { step: 2, title: '学习基础语法', status: 'current', icon: TrendingUp },
    { step: 3, title: '听力入门', status: 'pending', icon: Target },
    { step: 4, title: '口语练习', status: 'pending', icon: Award },
  ];

  const languageColors: Record<Language, string> = {
    en: 'from-blue-500 to-cyan-500',
    ja: 'from-pink-500 to-rose-500',
    ko: 'from-purple-500 to-indigo-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-bold text-primary-900 mb-2">个性化推荐</h1>
          <p className="text-primary-600">基于你的学习情况定制的学习路径</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-accent-green/20 to-emerald-500/10 rounded-3xl p-6 border border-accent-green/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent-green rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary-900">学习路径</h2>
                <p className="text-sm text-primary-600">基于你的目标制定</p>
              </div>
            </div>

            <div className="space-y-4">
              {learningPath.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = step.status === 'completed';
                const isCurrent = step.status === 'current';

                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-4"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-accent-green text-white'
                          : isCurrent
                          ? 'bg-accent-amber text-white'
                          : 'bg-primary-200 text-primary-500'
                      }`}
                    >
                      {isCompleted ? (
                        <span className="text-sm font-bold">✓</span>
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          isCompleted ? 'text-accent-green' : isCurrent ? 'text-primary-900' : 'text-primary-500'
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                    {isCurrent && (
                      <span className="px-2 py-1 bg-accent-amber/20 text-accent-amber text-xs rounded-full font-medium">
                        进行中
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary-900">薄弱点分析</h2>
                <p className="text-sm text-primary-600">需要加强的领域</p>
              </div>
            </div>

            <div className="space-y-4">
              {weaknesses.map((weak, index) => (
                <motion.div
                  key={weak.skill}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-primary-50 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-primary-900">{weak.skill}</span>
                    <span className="text-sm text-primary-600">{weak.score}%</span>
                  </div>
                  <div className="h-2 bg-primary-200 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      style={{ width: `${weak.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-primary-600">{weak.suggestion}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary-900">推荐课程</h2>
              <p className="text-primary-600">根据你的水平精选</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`h-32 bg-gradient-to-br ${languageColors[course.language]} relative`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                    {languageFlags[course.language]} {course.level}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Zap className="w-6 h-6 text-accent-amber" />
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-primary-900 mb-2">{course.title}</h3>
                  <p className="text-primary-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex items-center justify-between text-sm text-primary-500 mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.totalLessons}课
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.estimatedHours}h
                    </span>
                  </div>

                  <button className="w-full py-2.5 bg-gradient-to-r from-accent-green to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    开始学习
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-primary-900 mb-4">学习小贴士</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 rounded-xl p-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center mb-3">
                <span className="text-white text-xl">💡</span>
              </div>
              <h3 className="font-medium text-primary-900 mb-2">碎片化学习</h3>
              <p className="text-sm text-primary-600">每天学习15-20分钟，比一次性学习2小时效果更好</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-3">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="font-medium text-primary-900 mb-2">设定具体目标</h3>
              <p className="text-sm text-primary-600">明确的学习目标能帮助你保持动力和专注</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4">
              <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center mb-3">
                <span className="text-white text-xl">🗣️</span>
              </div>
              <h3 className="font-medium text-primary-900 mb-2">多说多练</h3>
              <p className="text-sm text-primary-600">不要害怕犯错，勇敢开口说是学习口语的关键</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
