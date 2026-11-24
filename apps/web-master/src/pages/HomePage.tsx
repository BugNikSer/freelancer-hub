import { useSession } from '@/lib/auth-client';

export function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Привет, {session?.user.name}!</h1>
      <p className="text-muted-foreground">
        Вы находитесь на защищенной главной странице. Ваша сессия активна.
      </p>
    </div>
  );
}
