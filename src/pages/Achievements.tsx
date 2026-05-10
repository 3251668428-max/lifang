import { motion } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import {
  Award,
  Flame,
  BookOpen,
  Users,
  Star,
  Trophy,
  Medal,
  Crown,
  Target,
  Clock,
  Zap,
  Heart
} from 'lucide-react';

const allAchievements = [
  { id: 'first-lesson', name: '初学者', description: '完成第一节课', icon: Star, unlocked: true, category: 'completion' },
  { id: 'streak-7', name: '一周坚持', description: '连续学习7天', icon: Flame, unlocked: true, category: 'streak' },
  { id: 'streak-30', name: '月度学员', description: '连续学习30天', icon: Flame, unlocked: false, category: 'streak' },
  { id: 'words-100', name: '词汇达人', description: '学习100个单词', icon: BookOpen, unlocked: true, category: 'level' },
  { id: 'words-500', name: '词汇专家', description: '学习500个单词', icon: BookOpen, unlocked: false, category: 'level' },
  { id: 'words-1000', name: '词汇大师', description: '学习1000个单词', icon: Crown, unlocked: false, category: 'level' },
  { id: 'grammar-50', name: '语法入门', description: '完成50道语法题', icon: Target, unlocked: true, category: 'completion' },
  { id: 'grammar-200', name: '语法进阶', description: '完成200道语法题', icon: Target, unlocked: false, category: 'completion' },
  { id: 'social-10', name: '社交达人', description: '在社区发布10篇帖子', icon: Users, unlocked: false, category: 'social' },
  { id: 'perfect-score', name: '满分达成', description: '练习获得100分', icon: Trophy, unlocked: true, category: 'completion' },
  { id: 'hour-10', name: '学习新秀', description: '累计学习10小时', icon: Clock, unlocked: true, category: 'level' },
  { id: 'hour-100', name: '学习达人', description: '累计学习100小时', icon: Zap, unlocked: false, category: 'level' },
  { id: 'xp-1000', name: '千点达人', description: '获得1000经验值', icon: Medal, unlocked: false, category: 'level' },
  { id: 'first-love', name: '初心不改', description: '获得首个徽章', icon: Heart, unlocked: true, category: 'completion' },
];

const categoryColors = {
  streak: 'from-orange-500 to-red-500',
  level: 'from-blue-500 to-indigo-500',
  completion: 'from-emerald-500 to-teal-500',
  social: 'from-pink-500 to-rose-500',
};

export default function Achievements() {
  const user = useUserStore((state) => state.user);
  const unlockedCount = allAchievements.filter((a) => a.unlocked).length;
  const totalCount = allAchievements.length;

  const leaderboard = [
    { name: '日语小达人', xp: 12500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leader1' },
    { name: '英语爱好者', xp: 11200, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leader2' },
    { name: '韩语追剧党', xp: 10800, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leader3' },
    { name: user?.username || '你', xp: user?.totalXp || 0, avatar: user?.avatar, isCurrentUser: true },
    { name: '学习达人', xp: 8200, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leader5' },
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-bold text-primary-900 mb-2">成就中心</h1>
          <p className="text-primary-600">收集徽章，解锁成就</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-6 text-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8" />
              <h2 className="text-xl font-semibold">徽章收集</h2>
            </div>
            <div className="text-center mb-4">
              <p className="text-5xl font-bold mb-2">{unlockedCount}</p>
              <p className="text-white/80">已获得 / {totalCount} 总计</p>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-6 text-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <Flame className="w-8 h-8" />
              <h2 className="text-xl font-semibold">连续学习</h2>
            </div>
            <div className="text-center mb-4">
              <p className="text-5xl font-bold mb-2">{user?.streak || 0}</p>
              <p className="text-white/80">天</p>
            </div>
            <p className="text-sm text-white/80 text-center">再坚持 {7 - (user?.streak || 0) % 7} 天解锁下一成就</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl p-6 text-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-8 h-8" />
              <h2 className="text-xl font-semibold">经验值排名</h2>
            </div>
            <div className="text-center mb-4">
              <p className="text-5xl font-bold mb-2">#{leaderboard.findIndex((l) => l.isCurrentUser) + 1}</p>
              <p className="text-white/80">当前排名</p>
            </div>
            <p className="text-sm text-white/80 text-center">距离上一名还差 {leaderboard[leaderboard.findIndex((l) => l.isCurrentUser) - 1]?.xp - (user?.totalXp || 0)} XP</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-primary-900 mb-6">排行榜</h2>
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <motion.div
                  key={user.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className={`flex items-center gap-4 p-3 rounded-xl ${
                    user.isCurrentUser ? 'bg-accent-green/10 border border-accent-green/30' : 'bg-primary-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-amber-500 text-white' :
                    index === 1 ? 'bg-gray-400 text-white' :
                    index === 2 ? 'bg-amber-700 text-white' :
                    'bg-primary-200 text-primary-700'
                  }`}>
                    {index + 1}
                  </div>
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <p className="font-medium text-primary-900">{user.name}</p>
                    <p className="text-sm text-primary-500">{user.xp.toLocaleString()} XP</p>
                  </div>
                  {user.isCurrentUser && (
                    <span className="px-2 py-1 bg-accent-green text-white text-xs rounded-full">你</span>
                  )}
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
            <h2 className="text-xl font-semibold text-primary-900 mb-6">成就分类</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '连续打卡', count: allAchievements.filter((a) => a.category === 'streak').length, color: 'from-orange-500 to-red-500' },
                { label: '等级提升', count: allAchievements.filter((a) => a.category === 'level').length, color: 'from-blue-500 to-indigo-500' },
                { label: '完成挑战', count: allAchievements.filter((a) => a.category === 'completion').length, color: 'from-emerald-500 to-teal-500' },
                { label: '社交互动', count: allAchievements.filter((a) => a.category === 'social').length, color: 'from-pink-500 to-rose-500' },
              ].map((cat) => (
                <div key={cat.label} className={`bg-gradient-to-br ${cat.color} rounded-xl p-4 text-white`}>
                  <p className="text-2xl font-bold mb-1">{cat.count}</p>
                  <p className="text-sm opacity-90">{cat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-primary-900 mb-6">所有徽章</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allAchievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.02 * index }}
                  className={`relative p-4 rounded-2xl text-center transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300'
                      : 'bg-primary-100 opacity-60'
                  }`}
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                      achievement.unlocked
                        ? `bg-gradient-to-br ${categoryColors[achievement.category]}`
                        : 'bg-primary-300'
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${achievement.unlocked ? 'text-white' : 'text-primary-500'}`} />
                  </div>
                  <p className={`font-semibold text-sm ${achievement.unlocked ? 'text-primary-900' : 'text-primary-500'}`}>
                    {achievement.name}
                  </p>
                  <p className="text-xs text-primary-500 mt-1">{achievement.description}</p>
                  {!achievement.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-primary-400 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
