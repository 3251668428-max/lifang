import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import { languageFlags } from '../data/courses';
import {
  Users,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  Search,
  TrendingUp,
  Clock
} from 'lucide-react';
import type { CommunityPost, Language } from '../types';

const initialPosts: CommunityPost[] = [
  {
    id: '1',
    authorId: 'user1',
    authorName: '日语小达人',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    content: '终于攻克了日语敬语！分享一下我的学习方法：每天背诵10个常用敬语句型，然后找语伴练习。推荐大家试试「Shadowing」跟读法，效果真的很棒！',
    language: 'ja',
    likes: 234,
    comments: 45,
    createdAt: '2小时前',
  },
  {
    id: '2',
    authorId: 'user2',
    authorName: '英语爱好者',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
    content: '英语口语提升心得：通过看美剧学习地道的表达方式。我最近在看《Friends》，已经看到第5遍了，感觉听力进步很明显！大家有什么好的学习方法吗？',
    language: 'en',
    likes: 189,
    comments: 67,
    createdAt: '5小时前',
  },
  {
    id: '3',
    authorId: 'user3',
    authorName: '韩语追剧党',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
    content: '学习韩语3个月，成功考过TOPIK I！给大家推荐我的备考资料和学习计划，有需要的小伙伴可以留言～',
    language: 'ko',
    likes: 456,
    comments: 123,
    createdAt: '1天前',
  },
];

export default function Community() {
  const user = useUserStore((state) => state.user);
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>('all');

  const filteredPosts = selectedLanguage === 'all'
    ? posts
    : posts.filter((p) => p.language === selectedLanguage);

  const handlePost = () => {
    if (!newPost.trim() || !user) return;

    const post: CommunityPost = {
      id: Date.now().toString(),
      authorId: user.id,
      authorName: user.username,
      authorAvatar: user.avatar,
      content: newPost,
      language: user.targetLanguages[0] || 'en',
      likes: 0,
      comments: 0,
      createdAt: '刚刚',
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map((p) =>
      p.id === postId ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-bold text-primary-900 mb-2">学习社区</h1>
          <p className="text-primary-600">与学习伙伴交流心得</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 mb-6 shadow-md"
        >
          <div className="flex gap-3">
            <img
              src={user?.avatar}
              alt={user?.username}
              className="w-10 h-10 rounded-full bg-primary-100"
            />
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="分享你的学习心得..."
                className="w-full p-3 bg-primary-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-accent-green/50 text-primary-900 placeholder-primary-400"
                rows={3}
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-2">
                  {(['en', 'ja', 'ko'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        selectedLanguage === lang
                          ? 'bg-accent-green text-white'
                          : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                      }`}
                    >
                      {languageFlags[lang]}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handlePost}
                  disabled={!newPost.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-accent-green to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  发布
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-4 mb-6">
          {[
            { label: '全部', value: 'all' as const, icon: Users },
            { label: '热门', value: 'hot' as const, icon: TrendingUp },
            { label: '最新', value: 'new' as const, icon: Clock },
          ].map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.value}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-primary-600 hover:bg-primary-50 transition-all shadow-sm"
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{filter.label}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="bg-white rounded-2xl p-5 shadow-md"
            >
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full bg-primary-100"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-primary-900">{post.authorName}</span>
                    <span className="text-lg">{languageFlags[post.language]}</span>
                  </div>
                  <p className="text-sm text-primary-500">{post.createdAt}</p>
                </div>
              </div>

              <p className="text-primary-800 leading-relaxed mb-4">{post.content}</p>

              <div className="flex items-center gap-6 pt-4 border-t border-primary-100">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-primary-500 hover:text-accent-pink transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-primary-500 hover:text-accent-green transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-primary-500 hover:text-accent-amber transition-colors ml-auto">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
