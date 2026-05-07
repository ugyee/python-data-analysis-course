import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Layout } from '@/components/Layout';
import { Mail, Lock, User, UserPlus, ArrowLeft } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('请填写所有字段');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (password.length < 6) {
      setError('密码长度至少6位');
      return;
    }

    const mockUser = {
      id: 'user-' + Date.now(),
      email,
      name,
      points: 0,
      createdAt: new Date().toISOString(),
    };

    login(mockUser, 'mock-token');
    navigate('/');
  };

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-soft-muted hover:text-primary-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            返回
          </button>

          <h1 className="text-2xl font-bold text-soft-text mb-6">创建账号</h1>

          <div className="bg-white rounded-3xl shadow-soft p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-soft-gradient flex items-center justify-center mx-auto mb-4">
                <UserPlus className="text-white" size={28} />
              </div>
              <p className="text-soft-muted mt-2">开始你的数据分析学习之旅</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm text-soft-muted mb-2">姓名</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-soft-muted" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="你的名字"
                    className="w-full pl-10 pr-4 py-3 bg-soft-bg border border-gray-200 rounded-xl text-soft-text placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-soft-muted mb-2">邮箱</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-soft-muted" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-soft-bg border border-gray-200 rounded-xl text-soft-text placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-soft-muted mb-2">密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-soft-muted" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="至少6位"
                    className="w-full pl-10 pr-4 py-3 bg-soft-bg border border-gray-200 rounded-xl text-soft-text placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-soft-muted mb-2">确认密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-soft-muted" size={18} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="再次输入密码"
                    className="w-full pl-10 pr-4 py-3 bg-soft-bg border border-gray-200 rounded-xl text-soft-text placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-soft-gradient text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                注册
              </button>
            </form>

            <div className="mt-6 text-center text-soft-muted">
              已有账户？{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-600">
                立即登录
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
