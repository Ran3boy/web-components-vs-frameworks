import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Тема ВКР: Сравнительный анализ технологии Web Components и современных фронтенд-фреймворков</h2>
    <p>Добро пожаловать! Это интерактивный стенд для визуального и технического сравнения подходов к разработке UI-компонентов.</p>
    <p>Цель проекта — продемонстрировать различия между реализацией нативного Web Components и современных фреймворков (React).</p>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <header style={{ padding: '1rem 2rem', background: '#282c34', color: 'white' }}>
        <h1 style={{ margin: '0 0 1rem 0' }}>Сравнение UI-технологий</h1>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/" style={{ color: '#61dafb', textDecoration: 'none' }}>Главная</Link>
          <Link to="/compare" style={{ color: '#61dafb', textDecoration: 'none' }}>Сравнение компонентов</Link>
        </nav>
      </header>
      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<div>Раздел сравнения компонентов в разработке...</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;