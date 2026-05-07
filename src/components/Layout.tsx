import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { MiniCodeRunner } from './MiniCodeRunner';

interface LayoutProps {
  children: ReactNode;
  showCodeRunner?: boolean;
  layoutType?: 'default' | 'learn';
}

export function Layout({ children, showCodeRunner = false, layoutType = 'default' }: LayoutProps) {
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
    </div>
  );
}
