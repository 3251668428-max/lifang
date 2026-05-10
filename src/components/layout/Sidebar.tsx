import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { motion } from 'framer-motion';
import {
  Home,
  BookOpen,
  GraduationCap,
  BarChart3,
  Compass,
  Users,
  Award,
  User,
  LogOut,
  Sparkles
} from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/courses', icon: BookOpen, label: '课程' },
  { path: '/progress', icon: BarChart3, label: '进度' },
  { path: '/recommendations', icon: Compass, label: '推荐' },
  { path: '/community', icon: Users, label: '社区' },
  { path: '/achievements', icon: Award, label: '成就' },
  { path: '/profile', icon: User, label: '我的' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-primary-900/50 backdrop-blur-xl border-r border-white/10 fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-green to-accent-pink rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-serif font-bold text-white">LinguaFlow</span>
        </div>
      </div>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-accent-green/20 text-accent-green'
                      : 'text-primary-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-accent-green' : ''}`} />
                  </motion.div>
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="ml-auto w-1.5 h-1.5 bg-accent-green rounded-full"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        {user && (
          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-10 h-10 rounded-full bg-primary-700"
              />
              <div>
                <p className="text-white font-medium text-sm">{user.username}</p>
                <p className="text-primary-400 text-xs">Lv.{Math.floor(user.totalXp / 100) + 1}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-accent-amber">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{user.totalXp} XP</span>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-primary-300 hover:text-white rounded-xl transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">退出登录</span>
        </button>
      </div>
    </aside>
  );
}
