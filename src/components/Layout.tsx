import { ReactNode, useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { MiniCodeRunner } from './MiniCodeRunner';
import { ArrowUp } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  showCodeRunner?: boolean;
  layoutType?: 'default' | 'learn';
}

export function Layout({ children, showCodeRunner = false, layoutType = 'default' }: LayoutProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 学习页面使用三栏布局：左侧 280px，中间 1fr，右侧 360px
  if (layoutType === 'learn' && showCodeRunner) {
    return (
      <div className="min-h-screen bg-soft-bg">
        <Sidebar />
        <main className="pt-16">
          <div className="grid grid-cols-[280px_1fr_360px] h-[calc(100vh-4rem)] gap-4 p-4">
            {children}
            <div className="h-full overflow-hidden rounded-2xl shadow-soft">
              <MiniCodeRunner />
            </div>
          </div>
        </main>
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 w-14 h-14 rounded-full bg-soft-gradient text-white shadow-soft-lg flex items-center justify-center hover:scale-110 transition-all duration-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          aria-label="回到顶部"
        >
          <ArrowUp size={24} />
        </button>
      </div>
    );
  }

  // 默认布局：内容居中，无右侧代码区
  return (
    <div className="min-h-screen bg-soft-bg">
      <Sidebar />
      <main className="pt-16">
        <div className="min-h-[calc(100vh-4rem)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </div>
      </main>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full bg-soft-gradient text-white shadow-soft-lg flex items-center justify-center hover:scale-110 transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="回到顶部"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}
