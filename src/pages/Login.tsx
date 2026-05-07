import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Layout } from '@/components/Layout';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('请填写所有字段');
      return;
    }

    const mockUser = {
      id: 'user-1',
      email,
      name: email.split('@')[0],
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

          <h1 className="text-2xl font-bold text-soft-text mb-6">欢迎回来</h1>

          <div className="bg-white rounded-3xl shadow-soft p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-soft-gradient flex items-center justify-center mx-auto mb-4">
                <LogIn className="text-white" size={28} />
              </div>
              <p className="text-soft-muted mt-2">登录你的账户继续学习</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

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
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-soft-bg border border-gray-200 rounded-xl text-soft-text placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-soft-gradient text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                登录
              </button>
            </form>

            <div className="mt-6 text-center text-soft-muted">
              还没有账户？{' '}
              <Link to="/register" className="text-primary-500 hover:text-primary-600">
                立即注册
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
