import React, { useState } from 'react';
import { View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { signIn, signUp } from '@/lib/auth-client';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      const res = isSignUp
        ? await signUp.email({ email, password, name: name || email.split('@')[0] })
        : await signIn.email({ email, password });

      if (res.error) {
        Alert.alert('Ошибка', res.error.message || 'Не удалось выполнить вход');
      }
    } catch (err: any) {
      Alert.alert('Ошибка сети', err.message || 'Проверьте подключение к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row justify-end px-4 pt-2">
        <ThemeToggle />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center gap-4 px-6"
      >
        <Text className="text-3xl font-bold text-foreground mb-2">
          {isSignUp ? 'Регистрация' : 'Вход в Freelancer Hub'}
        </Text>

        {isSignUp && (
          <Input placeholder="Ваше имя" value={name} onChangeText={setName} />
        )}

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          placeholder="Пароль (минимум 8 символов)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button onPress={handleAuth} disabled={loading} className="mt-2">
          <Text>{loading ? 'Загрузка...' : isSignUp ? 'Создать аккаунт' : 'Войти'}</Text>
        </Button>

        <Button variant="ghost" onPress={() => setIsSignUp(!isSignUp)}>
          <Text>
            {isSignUp ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
          </Text>
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
