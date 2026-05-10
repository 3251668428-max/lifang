import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import { languageNames } from '../data/courses';
import {
  User,
  Mail,
  Globe,
  Target,
  Settings,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Award,
  Clock,
  Flame,
  Sparkles
} from 'lucide-react';
import type { Language } from '../types';

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const { setDailyGoal, logout } = useUserStore();
  const [showGoalSetting, setShowGoalSetting] = useState(false);
  const [newGoal, setNewGoal] = useState(user?.dailyGoal || 30);

  const handleSaveGoal = () => {
    setDailyGoal(newGoal);
    setShowGoalSetting(false);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-bold text-primary-900 mb-2">个人中心</h1>
          <p className="text-primary-600">管理你的账户设置</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-1 bg-white rounded-3xl p-6 shadow-lg text-center"
          >
            <div className="relative inline-block mb-4">
              <img
                src={user?.avatar}
                alt={user?.username}
                className="w-28 h-28 rounded-full border-4 border-accent-green"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-accent-amber to-orange-500 rounded-full flex items-center justify-center border-4 border-white">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>

            <h2 className="text-xl font-semibold text-primary-900 mb-1">{user?.username}</h2>
            <p className="text-primary-500 mb-4">{user?.email}</p>

            <div className="flex items-center justify-center gap-4 py-4 border-t border-primary-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-900">{user?.totalXp || 0}</p>
                <p className="text-sm text-primary-500">经验值</p>
              </div>
              <div className="w-px h-10 bg-primary-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-900">Lv.{Math.floor((user?.totalXp || 0) / 100) + 1}</p>
                <p className="text-sm text-primary-500">等级</p>
              </div>
              <div className="w-px h-10 bg-primary-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-amber">{user?.streak || 0}</p>
                <p className="text-sm text-primary-500">连续天</p>
              </div>
            </div>

            <div className="bg-primary-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-primary-600">学习目标</span>
                <span className="font-semibold text-accent-green">{user?.dailyGoal}分钟/天</span>
              </div>
              <div className="h-2 bg-primary-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-green to-emerald-400 rounded-full"
                  style={{ width: `${Math.min(((user?.todayMinutes || 0) / (user?.dailyGoal || 30)) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm text-primary-500 mt-2">
                今日已学习 {user?.todayMinutes || 0} 分钟
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-primary-900">用户名</h3>
                  <p className="text-primary-500">{user?.username}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-primary-400" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-pink-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-primary-900">邮箱</h3>
                  <p className="text-primary-500">{user?.email}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-primary-400" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-primary-900">学习语言</h3>
                  <p className="text-primary-500">
                    {user?.targetLanguages.map((lang) => languageNames[lang]).join('、')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-primary-400" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-primary-900">每日学习目标</h3>
                  <p className="text-primary-500">{user?.dailyGoal} 分钟</p>
                </div>
                <button
                  onClick={() => setShowGoalSetting(true)}
                  className="px-4 py-2 bg-accent-green text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                >
                  修改
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {[
            { icon: Settings, label: '应用设置', color: 'bg-gray-100 text-gray-600' },
            { icon: Bell, label: '通知设置', color: 'bg-amber-100 text-amber-600' },
            { icon: Shield, label: '隐私与安全', color: 'bg-blue-100 text-blue-600' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="w-full bg-white rounded-2xl p-4 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="flex-1 text-left font-medium text-primary-900">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-primary-400" />
              </button>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full bg-red-50 rounded-2xl p-4 shadow-md flex items-center gap-4 hover:bg-red-100 transition-colors"
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <LogOut className="w-6 h-6 text-red-600" />
            </div>
            <span className="flex-1 text-left font-medium text-red-600">退出登录</span>
          </button>
        </motion.div>

        {showGoalSetting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowGoalSetting(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-4">设置每日目标</h3>
              <div className="mb-6">
                <label className="block text-sm text-primary-600 mb-2">学习时长（分钟）</label>
                <input
                  type="number"
                  value={newGoal}
                  onChange={(e) => setNewGoal(Number(e.target.value))}
                  min={5}
                  max={120}
                  className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-green text-primary-900"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowGoalSetting(false)}
                  className="flex-1 py-3 bg-primary-100 text-primary-700 rounded-xl font-medium hover:bg-primary-200 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSaveGoal}
                  className="flex-1 py-3 bg-accent-green text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
                >
                  保存
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
