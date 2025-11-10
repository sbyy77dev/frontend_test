import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { MessageCircle, Wallet, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

// 네비게이션 아이템
const navItems = [
  { path: 'chat', label: '챗봇', icon: MessageCircle },
  { path: 'wallet', label: '월렛', icon: Wallet },
  { path: 'spending', label: '분석', icon: LayoutGrid },
];

const MainLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2] || 'chat';

  return (
    <div className="app-container flex flex-col h-screen">
      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* 하단 탭 네비게이션 */}
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background border-t">
        <nav className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <NavLink
                key={item.path}
                to={`/app/${item.path}`}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center w-full h-full gap-1 text-xs',
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground'
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </footer>
    </div>
  );
};

export default MainLayout;