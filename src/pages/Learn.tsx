import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import { useLearningStore } from '../store/learningStore';
import { useCourseStore } from '../store/courseStore';
import { vocabularyData } from '../data/vocabulary';
import { grammarData } from '../data/grammar';
import { languageFlags } from '../data/courses';
import {
  ArrowLeft,
  Volume2,
  RotateCcw,
  Check,
  X,
  ChevronRight,
  BookOpen,
  Mic,
  Headphones,
  Trophy
} from 'lucide-react';
import type { Vocabulary, GrammarExercise, ModuleType, Language } from '../types';

const moduleTypes: { type: ModuleType; icon: typeof BookOpen; label: string; color: string }[] = [
  { type: 'vocabulary', icon: BookOpen, label: '单词记忆', color: 'from-emerald-500 to-teal-500' },
  { type: 'grammar', icon: BookOpen, label: '语法练习', color: 'from-blue-500 to-indigo-500' },
  { type: 'speaking', icon: Mic, label: '口语跟读', color: 'from-pink-500 to-rose-500' },
  { type: 'listening', icon: Headphones, label: '听力训练', color: 'from-amber-500 to-orange-500' },
];

export default function Learn() {
  const { courseId, moduleType } = useParams<{ courseId: string; moduleType: string }>();
  const navigate = useNavigate();
  const { user, updateProgress, updateTodayMinutes } = useUserStore();
  const { addRecord } = useLearningStore();
  const { courses } = useCourseStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [score, setScore] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [startTime] = useState(Date.now());

  const course = courses.find((c) => c.id === courseId);
  const language = course?.language || 'en';

  const vocabularyList = vocabularyData[courseId || ''] || vocabularyData['en-a1'];
  const grammarList = grammarData[courseId || ''] || grammarData['en-a1'];
  const currentVocab = vocabularyList[currentIndex];
  const currentGrammar = grammarList[currentIndex % grammarList.length];

  const allExercises: (GrammarExercise & { grammarId: string })[] = grammarList.flatMap((g) =>
    g.exercises.map((ex) => ({ ...ex, grammarId: g.id }))
  );
  const currentExercise = allExercises[currentIndex];

  const items = moduleType === 'vocabulary' ? vocabularyList : allExercises;
  const currentItem = moduleType === 'vocabulary' ? currentVocab : currentExercise;

  const speakWord = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : language === 'ja' ? 'ja-JP' : 'ko-KR';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === currentExercise.correctAnswer;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setScore((prev) => prev + 10);
    }

    addRecord({
      userId: user?.id || '',
      courseId: courseId || '',
      moduleType: moduleType as ModuleType,
      lessonId: currentItem?.id || '',
      score: isCorrect ? 100 : 0,
      timeSpent: 5,
      completedAt: new Date().toISOString(),
      mistakes: isCorrect ? [] : [currentExercise.question],
    });
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setSessionComplete(true);
      const timeSpent = Math.round((Date.now() - startTime) / 60000);
      updateProgress(score);
      updateTodayMinutes(timeSpent);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setScore(0);
    setSessionComplete(false);
  };

  const progress = ((currentIndex + 1) / items.length) * 100;

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-gradient-to-br from-accent-amber to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="text-2xl font-serif font-bold text-primary-900 mb-2">学习完成！</h2>
          <p className="text-primary-600 mb-6">你完成了 {items.length} 个练习</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-primary-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-accent-green">{correctCount}</p>
              <p className="text-sm text-primary-600">正确</p>
            </div>
            <div className="bg-primary-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-accent-amber">{score}</p>
              <p className="text-sm text-primary-600">获得经验</p>
            </div>
            <div className="bg-primary-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-primary-900">{Math.round((correctCount / items.length) * 100)}%</p>
              <p className="text-sm text-primary-600">正确率</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRestart}
              className="w-full py-3 bg-gradient-to-r from-accent-green to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              再练一次
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="w-full py-3 bg-primary-100 text-primary-700 font-semibold rounded-xl hover:bg-primary-200 transition-all flex items-center justify-center gap-2"
            >
              返回课程
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-lg border-b border-primary-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/courses')}
              className="p-2 hover:bg-primary-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-primary-700" />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xl">{languageFlags[language]}</span>
              <span className="font-medium text-primary-900">{course?.title}</span>
            </div>
            <div className="text-sm text-primary-600">
              {currentIndex + 1} / {items.length}
            </div>
          </div>
          <div className="mt-4 h-2 bg-primary-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-accent-green to-emerald-400 rounded-full"
            />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex gap-2 mb-6">
          {moduleTypes.map((mod) => {
            const Icon = mod.icon;
            const isActive = mod.type === moduleType;
            return (
              <button
                key={mod.type}
                onClick={() => navigate(`/learn/${courseId}/${mod.type}`)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${mod.color} text-white`
                    : 'bg-white text-primary-600 hover:bg-primary-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {mod.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {moduleType === 'vocabulary' && currentVocab && (
            <motion.div
              key={currentVocab.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mb-8"
            >
              <div
                className="relative h-80 cursor-pointer perspective-1000"
                onClick={handleFlip}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-accent-green to-emerald-500 rounded-3xl flex flex-col items-center justify-center p-8 shadow-xl"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <h2 className="text-4xl font-serif font-bold text-white mb-4">{currentVocab.word}</h2>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWord(currentVocab.word);
                      }}
                      className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    >
                      <Volume2 className="w-6 h-6 text-white" />
                    </button>
                    <p className="text-white/80 mt-4">点击翻转查看释义</p>
                  </div>

                  <div
                    className="absolute inset-0 bg-white rounded-3xl flex flex-col items-center justify-center p-8 shadow-xl"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <p className="text-3xl font-semibold text-primary-900 mb-2">{currentVocab.meaning}</p>
                    {currentVocab.reading && (
                      <p className="text-lg text-primary-500 mb-6">{currentVocab.reading}</p>
                    )}
                    <div className="bg-primary-50 rounded-xl p-4 w-full">
                      <p className="text-primary-700 italic mb-2">"{currentVocab.example}"</p>
                      <p className="text-primary-500 text-sm">{currentVocab.exampleTranslation}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {moduleType === 'grammar' && currentExercise && (
            <motion.div
              key={currentExercise.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl p-8 shadow-xl mb-8"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-6">{currentExercise.question}</h3>

              <div className="space-y-3">
                {currentExercise.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentExercise.correctAnswer;

                  let bgColor = 'bg-primary-50 hover:bg-primary-100';
                  if (showResult) {
                    if (isCorrect) {
                      bgColor = 'bg-accent-green/20 border-accent-green';
                    } else if (isSelected && !isCorrect) {
                      bgColor = 'bg-red-50 border-red-500';
                    }
                  } else if (isSelected) {
                    bgColor = 'bg-accent-green/10 border-accent-green';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={`w-full p-4 rounded-xl text-left transition-all border-2 ${bgColor} ${
                        showResult ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-primary-900 font-medium">{option}</span>
                        {showResult && isCorrect && <Check className="w-5 h-5 text-accent-green" />}
                        {showResult && isSelected && !isCorrect && <X className="w-5 h-5 text-red-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-primary-50 rounded-xl p-4"
                >
                  <p className="text-primary-700">
                    <span className="font-semibold">解析：</span>
                    {currentExercise.explanation}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {(moduleType === 'speaking' || moduleType === 'listening') && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl mb-8 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                {moduleType === 'speaking' ? (
                  <Mic className="w-12 h-12 text-white" />
                ) : (
                  <Headphones className="w-12 h-12 text-white" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                {moduleType === 'speaking' ? '口语跟读' : '听力训练'}
              </h3>
              <p className="text-primary-600 mb-6">
                {moduleType === 'speaking'
                  ? '点击播放并跟读标准发音'
                  : '播放音频并完成听力练习'}
              </p>
              <p className="text-primary-500 text-sm">
                该模块功能需要麦克风权限或音频资源
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center">
          <button
            onClick={handleNext}
            disabled={moduleType === 'grammar' && !showResult}
            className="px-8 py-4 bg-gradient-to-r from-accent-green to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent-green/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {currentIndex < items.length - 1 ? (
              <>
                下一题
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              <>
                完成学习
                <Trophy className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
