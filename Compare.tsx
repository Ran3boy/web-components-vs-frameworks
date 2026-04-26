import React, { useEffect, useRef } from 'react';
import { ReactProductCard } from '../components/react/ProductCard';
import '../components/web-components/ProductCard';
import { Product } from '../components/shared/types';

const demoProduct: Product = {
  id: '123',
  name: 'Умная колонка AI',
  description: 'Компактная умная колонка с голосовым помощником для управления умным домом.',
  price: 3990,
  imageUrl: 'https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
};

export const ComparePage: React.FC = () => {
  const wcRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleAddToCart = (e: Event) => {
      const customEvent = e as CustomEvent;
      alert(`[Web Component] Товар ${customEvent.detail.id} добавлен в корзину!`);
    };

    const currentWc = wcRef.current;
    if (currentWc) {
      currentWc.addEventListener('add-to-cart', handleAddToCart);
    }

    return () => {
      if (currentWc) {
        currentWc.removeEventListener('add-to-cart', handleAddToCart);
      }
    };
  }, []);

  const handleReactAddToCart = (id: string) => {
    alert(`[React] Товар ${id} добавлен в корзину!`);
  };

  return (
    <div>
      <h2>Сравнение технологий: Карточка товара</h2>
      <p>Ниже представлены два визуально идентичных компонента, разработанных с использованием разных подходов.</p>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', margin: '2rem 0' }}>
        <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <h3>Реализация на React</h3>
          <ReactProductCard product={demoProduct} onAddToCart={handleReactAddToCart} />
        </div>

        <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <h3>Реализация на Web Components</h3>
          <wc-product-card
            ref={wcRef}
            product-id={demoProduct.id}
            name={demoProduct.name}
            description={demoProduct.description}
            price={demoProduct.price}
            image-url={demoProduct.imageUrl}
          ></wc-product-card>
        </div>
      </div>

      <h3>Анализ и Бенчмаркинг</h3>
      <table border={1} cellPadding={12} style={{ borderCollapse: 'collapse', width: '100%', background: 'white' }}>
        <thead>
          <tr style={{ background: '#e9ecef', textAlign: 'left' }}>
            <th>Критерий</th>
            <th>Web Components</th>
            <th>React</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><b>Инкапсуляция стилей</b></td><td>Нативная (через Shadow DOM). Стили компонента никак не могут сломать глобальную верстку.</td><td>Эмулируется через CSS Modules, Styled Components или BEM.</td></tr>
          <tr><td><b>Зависимости</b></td><td>0 KB (используется встроенный API браузера).</td><td>~40 KB (react + react-dom).</td></tr>
          <tr><td><b>Переиспользуемость</b></td><td>Максимальная. Можно вставить в любой проект (Vue, Angular, чистый HTML).</td><td>Ограничена экосистемой React.</td></tr>
          <tr><td><b>Сложность разработки</b></td><td>Средняя. Нужно вручную управлять DOM-узлами и подписками на атрибуты.</td><td>Низкая. Декларативный подход JSX сильно ускоряет создание UI.</td></tr>
        </tbody>
      </table>
    </div>
  );
};