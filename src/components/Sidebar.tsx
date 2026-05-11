import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { 
  Home, 
  BookOpen, 
  Map, 
  Users,
  User, 
  LogIn,
  Menu, 
  X 
} from 'lucide-react';
import { useState } from 'react';

export function Sidebar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', icon: Home, label: '首页', active: location.pathname === '/' },
    { to: '/courses', icon: BookOpen, label: '所有课程', active: location.pathname.startsWith('/courses') },
    { to: '/learning-path', icon: Map, label: '学习路线', active: location.pathname === '/learning-path' },
    { to: '/about', icon: Users, label: '关于我们', active: location.pathname === '/about' },
  ];

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-primary-100/50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-soft-gradient flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-all">
                <span className="text-white font-bold text-lg">Py</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-soft-text font-semibold text-lg">数据分析</span>
                <span className="text-soft-muted text-sm ml-1">学习平台</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all min-w-[44px] min-h-[44px] justify-center ${
                      link.active
                        ? 'bg-primary-100 text-primary-600'
                        : 'text-soft-muted hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-soft-text hover:text-primary-600 hover:bg-primary-50 transition-all min-w-[44px] min-h-[44px] justify-center"
                  >
                    <User size={18} />
                    <span>{user?.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-soft-muted hover:text-red-500 hover:bg-red-50 transition-all min-w-[44px] min-h-[44px] justify-center"
                  >
                    退出
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-soft-gradient text-white font-medium shadow-soft hover:shadow-soft-lg transition-all min-w-[44px] min-h-[44px] justify-center"
                >
                  <LogIn size={18} />
                  <span>登录</span>
                </Link>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 text-soft-muted hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="切换菜单"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        </div>
      )}

      <div 
        className={`fixed top-16 left-0 right-0 bottom-0 z-50 bg-white transform transition-all duration-300 md:hidden ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all min-h-[56px] ${
                    link.active
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-soft-muted hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-lg font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-primary-100/50 p-4">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-4 rounded-2xl text-soft-text hover:bg-primary-50 transition-all min-h-[56px]"
                >
                  <User size={24} />
                  <span className="text-lg font-medium">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-soft-muted hover:text-red-500 hover:bg-red-50 transition-all min-h-[56px]"
                >
                  <span className="text-lg font-medium">退出登录</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-soft-gradient text-white font-medium shadow-soft hover:shadow-soft-lg transition-all min-h-[56px]"
              >
                <LogIn size={24} />
                <span className="text-lg font-medium">登录</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
