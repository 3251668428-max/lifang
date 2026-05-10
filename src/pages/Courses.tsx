import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourseStore } from '../store/courseStore';
import { languageNames, languageFlags } from '../data/courses';
import {
  BookOpen,
  Clock,
  Users,
  ChevronRight,
  Play,
  Check
} from 'lucide-react';
import type { Language, Level } from '../types';

const levels: (Level | 'all')[] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function Courses() {
  const navigate = useNavigate();
  const {
    selectedLanguage,
    selectedLevel,
    selectLanguage,
    selectLevel,
    getFilteredCourses,
    enrolledCourses,
    enrollCourse,
  } = useCourseStore();

  const courses = getFilteredCourses();

  const languageColors: Record<Language, string> = {
    en: 'from-blue-500 to-cyan-500',
    ja: 'from-pink-500 to-rose-500',
    ko: 'from-purple-500 to-indigo-500',
  };

  const handleEnroll = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    enrollCourse(courseId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-bold text-primary-900 mb-2">课程中心</h1>
          <p className="text-primary-600">选择适合你的语言学习课程</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 mb-6 shadow-md"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="flex bg-primary-100 rounded-xl p-1">
                {(['en', 'ja', 'ko'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => selectLanguage(lang)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedLanguage === lang
                        ? 'bg-white text-primary-900 shadow-sm'
                        : 'text-primary-600 hover:text-primary-900'
                    }`}
                  >
                    <span>{languageFlags[lang]}</span>
                    <span>{languageNames[lang]}</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => selectLevel(level)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedLevel === level
                        ? 'bg-accent-green text-white'
                        : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                    }`}
                  >
                    {level === 'all' ? '全部等级' : level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => {
            const isEnrolled = enrolledCourses.includes(course.id);
            const progress = enrolledCourses.includes(course.id) ? Math.random() * 60 : 0;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/learn/${course.id}/vocabulary`)}
              >
                <div className={`h-40 bg-gradient-to-br ${languageColors[course.language]} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                    {languageFlags[course.language]} {course.level}
                  </div>
                  {isEnrolled && (
                    <div className="absolute top-4 right-4 bg-accent-green text-white rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-7 h-7 text-white ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-lg text-primary-900 mb-2">{course.title}</h3>
                  <p className="text-primary-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                  {isEnrolled && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-primary-500">学习进度</span>
                        <span className="text-accent-green font-medium">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="h-full bg-gradient-to-r from-accent-green to-emerald-400 rounded-full"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-primary-100">
                    <div className="flex items-center gap-4 text-sm text-primary-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.totalLessons}课
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.estimatedHours}h
                      </span>
                    </div>
                    <span className="text-primary-400 text-sm">{course.learnersCount.toLocaleString()}人在学</span>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={(e) => handleEnroll(course.id, e)}
                      className={`w-full py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                        isEnrolled
                          ? 'bg-accent-green/10 text-accent-green hover:bg-accent-green/20'
                          : 'bg-gradient-to-r from-accent-green to-emerald-500 text-white hover:shadow-lg hover:shadow-accent-green/25'
                      }`}
                    >
                      {isEnrolled ? (
                        <>
                          继续学习
                          <ChevronRight className="w-4 h-4" />
                        </>
                      ) : (
                        '加入学习'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
