import { Navigate, Outlet, Link, useLocation } from 'react-router';
import { useSession, signOut } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';

export function ProtectedLayout() {
  const { data: session, isPending } = useSession();
  const location = useLocation();

  // 1. Фоновая проверка сессии при загрузке приложения
  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center text-muted-foreground">
        Проверка сессии...
      </div>
    );
  }

  // 2. Нет валидной куки -> редирект на /login с сохранением исходного URL
  if (!session) {
    const redirectPath = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirectPath}`} replace />;
  }

  // 3. Сессия валидна -> показываем шапку и контент текущей страницы
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 py-3 flex items-center justify-between">
        <nav className="flex items-center gap-6">
          <span className="font-bold">Freelancer Hub</span>
          <Link to="/" className="text-sm hover:underline">
            Главная
          </Link>
          <Link to="/about" className="text-sm hover:underline">
            О проекте
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{session.user.email}</span>
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={() => signOut()}>
            Выйти
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
