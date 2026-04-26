import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { ComparePage } from './pages/Compare';
import { Card } from './components/ui/Card';

const Home = () => (
  <div>
    <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '4rem 0' }}>
      <div style={{ display: 'inline-block', background: '#DBEAFE', color: '#2563EB', padding: '6px 16px', borderRadius: '9999px', fontWeight: 600, marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        Исследовательский проект (ВКР)
      </div>
      <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 1.5rem 0', color: '#0F172A', lineHeight: 1.2 }}>
        Сравнительный анализ UI-технологий
      </h2>
      <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '800px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
        Интерактивный дашборд для визуального и технического сравнения подходов к разработке компонентов на базе нативных Web Components и современных фронтенд-фреймворков.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link to="/compare" style={{ background: '#2563EB', color: '#FFFFFF', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)', transition: 'background 0.2s' }}>
          Открыть Дашборд Сравнения
        </Link>
        <Link to="/compare" onClick={() => setTimeout(() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'}), 100)} style={{ background: '#FFFFFF', color: '#0F172A', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, border: '1px solid #E2E8F0', transition: 'background 0.2s' }}>
          Смотреть компоненты
        </Link>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
      <Card>
        <h3 style={{ color: '#0F172A', marginTop: 0 }}>⚙️ Web Components</h3>
        <p style={{ color: '#475569', lineHeight: 1.5, marginBottom: 0 }}>Нативный стандарт браузера (Custom Elements + Shadow DOM). Максимальная изоляция стилей и 0 KB сторонних зависимостей. Идеально для универсальных UI-китов.</p>
      </Card>
      <Card>
        <h3 style={{ color: '#0F172A', marginTop: 0 }}>⚛️ React / Фреймворки</h3>
        <p style={{ color: '#475569', lineHeight: 1.5, marginBottom: 0 }}>Декларативный подход (JSX), Virtual DOM и богатая экосистема. Высокая скорость разработки и удобство поддержки для крупных бизнес-приложений.</p>
      </Card>
      <Card>
        <h3 style={{ color: '#0F172A', marginTop: 0 }}>📊 Методика</h3>
        <p style={{ color: '#475569', lineHeight: 1.5, marginBottom: 0 }}>Сравнение проводится по метрикам: время загрузки, размер сборки, количество зависимостей, переиспользуемость и удобство поддержки.</p>
      </Card>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', color: '#0F172A', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '1.25rem', color: '#0F172A', fontWeight: 800 }}>Преддипломная практика <span style={{ color: '#2563EB' }}>Иванов Н.Ю</span></h1>
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <Link to="/" style={{ color: '#475569', textDecoration: 'none', fontWeight: 600 }}>Главная</Link>
              <Link to="/compare" style={{ color: '#475569', textDecoration: 'none', fontWeight: 600 }}>Дашборд</Link>
              <a href="#demo" onClick={(e) => { e.preventDefault(); document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'}); }} style={{ color: '#475569', textDecoration: 'none', fontWeight: 600, cursor: 'pointer' }}>Демонстрация</a>
              <a href="#methodology" onClick={(e) => { e.preventDefault(); document.getElementById('methodology')?.scrollIntoView({behavior: 'smooth'}); }} style={{ color: '#475569', textDecoration: 'none', fontWeight: 600, cursor: 'pointer' }}>Методика</a>
              <a href="#conclusions" onClick={(e) => { e.preventDefault(); document.getElementById('conclusions')?.scrollIntoView({behavior: 'smooth'}); }} style={{ color: '#475569', textDecoration: 'none', fontWeight: 600, cursor: 'pointer' }}>Выводы</a>
            </nav>
          </div>
        </header>
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;