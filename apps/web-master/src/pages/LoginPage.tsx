import { useState } from 'react';
import { Navigate, useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession, signIn, signUp } from '@/lib/auth-client';

export function LoginPage() {
  const { data: session, isPending } = useSession();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Если кука уже валидна — сразу уводим с /login на целевую страницу
  if (!isPending && session) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = isSignUp
        ? await signUp.email({ email, password, name: name || email.split('@')[0] })
        : await signIn.email({ email, password });

      if (res.error) {
        setErrorMsg(res.error.message || 'Ошибка авторизации');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={handleAuth} className="flex w-full max-w-sm flex-col gap-4">
        <h1 className="text-2xl font-bold">
          {isSignUp ? 'Регистрация' : 'Вход в Freelancer Hub'}
        </h1>

        {errorMsg && (
          <p className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{errorMsg}</p>
        )}

        {isSignUp && (
          <Input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />
        )}

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : isSignUp ? 'Создать аккаунт' : 'Войти'}
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setErrorMsg('');
          }}
        >
          {isSignUp ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </Button>
      </form>
    </div>
  );
}
