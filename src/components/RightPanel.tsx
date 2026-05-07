import { useAuthStore } from '@/store/authStore';
import { MiniCodeRunner } from './MiniCodeRunner';

export function RightPanel() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <aside className="hidden lg:block w-72 h-screen fixed right-0 top-16 z-30 p-4 overflow-y-auto bg-soft-bg">
      <div className="space-y-6">
        {isAuthenticated && (
          <div className="bg-gradient-to-br from-primary-100/50 to-accent-pink/30 rounded-3xl p-5 shadow-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-soft-gradient flex items-center justify-center">
                <span className="text-white font-bold text-xl">{user?.name?.[0]?.toUpperCase() || 'U'}</span>
              </div>
              <div>
                <h3 className="font-semibold text-soft-text">{user?.name}</h3>
                <p className="text-sm text-soft-muted">{user?.email}</p>
              </div>
            </div>
          </div>
        )}

        <MiniCodeRunner />
      </div>
    </aside>
  );
}
