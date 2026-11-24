import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { LoginPage } from '@/pages/LoginPage';
import { ProtectedLayout } from '@/components/ProtectedLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Публичный маршрут входа */}
        <Route path="/login" element={<LoginPage />} />

        {/* Группа защищенных маршрутов */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        {/* Любой неизвестный адрес отправляем на главную */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
