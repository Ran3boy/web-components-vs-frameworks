import React, { useEffect, useRef } from 'react';
import { ReactProductCard } from '../components/react/ProductCard';
import '../components/web-components/ProductCard';
import { ReactModal } from '../components/react/Modal';
import '../components/web-components/Modal';
import { ReactStateButton } from '../components/react/StateButton';
import '../components/web-components/StateButton';
import { ReactFeedbackForm } from '../components/react/FeedbackForm';
import '../components/web-components/FeedbackForm';
import { ReactItemList } from '../components/react/ItemList';
import '../components/web-components/ItemList';
import { Product } from '../types';
import { benchmarkResults } from '../data/benchmarkResults';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { CodeBlock } from '../components/ui/CodeBlock';

const demoProduct: Product = {
  id: '123',
  name: 'Умная колонка AI',
  description: 'Компактная умная колонка с голосовым помощником для управления умным домом.',
  price: 3990,
  imageUrl: 'https://cdn1.technopark.ru/technopark/photos_resized/product/1000_1000/308938/1_308938.jpg',
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

  // Вычисляем лучшие показатели для дашборда
  const bestLoadTime = Math.min(...benchmarkResults.map(r => r.loadTimeMs));
  const bestBundle = Math.min(...benchmarkResults.map(r => r.bundleSizeKb));
  const maxScore = Math.max(...benchmarkResults.map(r => r.finalScore));
  const maxMaintainability = Math.max(...benchmarkResults.map(r => r.maintainabilityScore));

  const reactCodeSnippet = `export const ReactProductCard: React.FC<Props> = ({ product }) => (
  <div className="card">
    <img src={product.imageUrl} alt={product.name} />
    <h4>{product.name}</h4>
    <p>{product.description}</p>
    <button>В корзину</button>
  </div>
);`;

  const wcCodeSnippet = `class WcProductCard extends HTMLElement {
  render() {
    this.shadowRoot.innerHTML = \`
      <div class="card">
        <img src="\${this.getAttribute('image-url')}" />
        <h4>\${this.getAttribute('name')}</h4>
        <p>\${this.getAttribute('description')}</p>
        <button>В корзину</button>
      </div>
    \`;
  }
}`;

  const vueCodeSnippet = `<template>
  <div class="card">
    <img :src="product.imageUrl" :alt="product.name" />
    <h4>{{ product.name }}</h4>
    <p>{{ product.description }}</p>
    <button @click="addToCart">В корзину</button>
  </div>
</template>`;

  const angularCodeSnippet = `@Component({
  selector: 'app-product-card',
  template: \`
    <div class="card">
      <img [src]="product.imageUrl" [alt]="product.name" />
      <h4>{{ product.name }}</h4>
      <p>{{ product.description }}</p>
      <button (click)="addToCart()">В корзину</button>
    </div>
  \`
})
export class ProductCardComponent { @Input() product: Product; }`;

  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.25rem', margin: '0 0 0.5rem 0' }}>Аналитический Дашборд</h2>
        <p style={{ color: '#475569', fontSize: '1.125rem', margin: 0 }}>Результаты комплексного сравнения UI-технологий</p>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        <MetricCard title="Мин. время загрузки" value={`${bestLoadTime} мс`} subtitle="Web Components" valueColor="#16A34A" />
        <MetricCard title="Мин. размер сборки" value={`${bestBundle} KB`} subtitle="Web Components" valueColor="#2563EB" />
        <MetricCard title="Лучшая поддержка" value={`${maxMaintainability}/10`} subtitle="React / Vue" valueColor="#F59E0B" />
        <MetricCard title="Лучшая оценка" value={maxScore} subtitle="React" valueColor="#7C3AED" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <Card>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#0F172A' }}>Время загрузки (мс) <span style={{fontSize: '0.875rem', color: '#64748B', fontWeight: 'normal'}}>Меньше = лучше</span></h3>
          {benchmarkResults.map(res => (
            <div key={`load-${res.technology}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '130px', fontWeight: 600, color: '#475569' }}>{res.technology}</div>
              <div style={{ flex: 1, background: '#F1F5F9', borderRadius: '8px', height: '20px', overflow: 'hidden' }}>
                <div style={{ width: `${(res.loadTimeMs / 250) * 100}%`, background: '#2563EB', height: '100%', borderRadius: '8px' }} />
              </div>
              <div style={{ width: '50px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{res.loadTimeMs}</div>
            </div>
          ))}
        </Card>

        <Card>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#0F172A' }}>Размер сборки (KB) <span style={{fontSize: '0.875rem', color: '#64748B', fontWeight: 'normal'}}>Меньше = лучше</span></h3>
          {benchmarkResults.map(res => (
            <div key={`bundle-${res.technology}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '130px', fontWeight: 600, color: '#475569' }}>{res.technology}</div>
              <div style={{ flex: 1, background: '#F1F5F9', borderRadius: '8px', height: '20px', overflow: 'hidden' }}>
                <div style={{ width: `${(res.bundleSizeKb / 100) * 100}%`, background: '#7C3AED', height: '100%', borderRadius: '8px' }} />
              </div>
              <div style={{ width: '50px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{res.bundleSizeKb}</div>
            </div>
          ))}
        </Card>

        <Card>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#0F172A' }}>Итоговая оценка <span style={{fontSize: '0.875rem', color: '#64748B', fontWeight: 'normal'}}>Больше = лучше</span></h3>
          {benchmarkResults.map(res => (
            <div key={`score-${res.technology}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '130px', fontWeight: 600, color: '#475569' }}>{res.technology}</div>
              <div style={{ flex: 1, background: '#F1F5F9', borderRadius: '8px', height: '20px', overflow: 'hidden' }}>
                <div style={{ width: `${(res.finalScore / 10) * 100}%`, background: '#10B981', height: '100%', borderRadius: '8px' }} />
              </div>
              <div style={{ width: '50px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{res.finalScore}</div>
            </div>
          ))}
        </Card>
      </div>

      <Card style={{ marginBottom: '4rem', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
          <h3 style={{ margin: 0, color: '#0F172A' }}>Сводная таблица результатов</h3>
          <p style={{ margin: '4px 0 0 0', color: '#64748B', fontSize: '0.875rem' }}>* Метрики являются демонстрационно-экспертными. Итоговая оценка рассчитывается по формуле.</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center', whiteSpace: 'nowrap' }}>
            <thead>
              <tr style={{ background: '#FFFFFF', color: '#475569', fontSize: '0.875rem', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ textAlign: 'left', padding: '16px 24px' }}>Технология</th>
                <th style={{ padding: '16px' }}>Загрузка (мс)</th>
                <th style={{ padding: '16px' }}>Рендер (мс)</th>
                <th style={{ padding: '16px' }}>Размер (KB)</th>
                <th style={{ padding: '16px' }}>Зависимости</th>
                <th style={{ padding: '16px' }}>Сложность (1-10)</th>
                <th style={{ padding: '16px' }}>Поддержка</th>
                <th style={{ padding: '16px' }}>Runtime</th>
                <th style={{ padding: '16px 24px' }}><b>Итог</b></th>
              </tr>
            </thead>
            <tbody>
              {benchmarkResults.map((res, i) => (
                <tr key={res.technology} style={{ borderBottom: i === benchmarkResults.length - 1 ? 'none' : '1px solid #E2E8F0', background: '#FFFFFF' }}>
                  <td style={{ textAlign: 'left', padding: '16px 24px', fontWeight: 600, color: '#0F172A' }}>{res.technology}</td>
                  <td style={{ padding: '16px' }}>{res.loadTimeMs}</td>
                  <td style={{ padding: '16px' }}>{res.renderTimeMs}</td>
                  <td style={{ padding: '16px' }}>{res.bundleSizeKb}</td>
                  <td style={{ padding: '16px' }}>{res.dependenciesCount}</td>
                  <td style={{ padding: '16px' }}>{res.complexityScore}</td>
                  <td style={{ padding: '16px' }}>{res.maintainabilityScore}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ background: res.runtimeRequired ? '#FEE2E2' : '#DCFCE7', color: res.runtimeRequired ? '#DC2626' : '#16A34A', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {res.runtimeRequired ? 'Да' : 'Нет'}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: 800, color: res.finalScore >= 8 ? '#16A34A' : '#F59E0B', fontSize: '1.125rem' }}>{res.finalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <div id="demo" style={{ marginBottom: '2rem', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '2.25rem', margin: '0 0 0.5rem 0' }}>Демонстрация Компонентов</h2>
        <p style={{ color: '#475569', fontSize: '1.125rem', margin: 0 }}>Сравнение визуальной идентичности и поведения</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '4rem' }}>
        <Card>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#0F172A', borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem' }}>Карточка товара</h3>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h4 style={{ color: '#475569', marginTop: 0 }}>React</h4>
              <div style={{ maxWidth: '400px' }}><ReactProductCard product={demoProduct} onAddToCart={handleReactAddToCart} /></div>
              <CodeBlock code={reactCodeSnippet} title="React (JSX + Props)" />
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <h4 style={{ color: '#475569', marginTop: 0 }}>Web Components</h4>
              <div style={{ maxWidth: '400px' }}><wc-product-card ref={wcRef} product-id={demoProduct.id} name={demoProduct.name} description={demoProduct.description} price={demoProduct.price} image-url={demoProduct.imageUrl}></wc-product-card></div>
              <CodeBlock code={wcCodeSnippet} title="Web Component (Custom Elements + Attributes)" />
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <h4 style={{ color: '#475569', marginTop: 0 }}>Vue.js</h4>
              <div style={{ maxWidth: '400px' }}>
                <div style={{ background: 'white', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <img src={demoProduct.imageUrl} alt={demoProduct.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h4 style={{ marginTop: 0, marginBottom: '8px' }}>{demoProduct.name} (Vue)</h4>
                    <p style={{ color: '#666', marginBottom: '16px', flex: 1 }}>{demoProduct.description}</p>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px' }}>{demoProduct.price} ₽</div>
                    <button onClick={() => alert('[Vue] Товар добавлен в корзину!')} style={{ background: '#10B981', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>В корзину</button>
                  </div>
                </div>
              </div>
              <CodeBlock code={vueCodeSnippet} title="Vue (SFC + Directives)" />
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <h4 style={{ color: '#475569', marginTop: 0 }}>Angular</h4>
              <div style={{ maxWidth: '400px' }}>
                <div style={{ background: 'white', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <img src={demoProduct.imageUrl} alt={demoProduct.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h4 style={{ marginTop: 0, marginBottom: '8px' }}>{demoProduct.name} (Angular)</h4>
                    <p style={{ color: '#666', marginBottom: '16px', flex: 1 }}>{demoProduct.description}</p>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px' }}>{demoProduct.price} ₽</div>
                    <button onClick={() => alert('[Angular] Товар добавлен в корзину!')} style={{ background: '#DD0031', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>В корзину</button>
                  </div>
                </div>
              </div>
              <CodeBlock code={angularCodeSnippet} title="Angular (TypeScript + Decorators)" />
            </div>
          </div>
        </Card>

        <Card>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#0F172A', borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem' }}>Модальное окно и Кнопка подписки</h3>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}><h4 style={{ color: '#475569', marginTop: 0 }}>React</h4><ReactModal /><ReactStateButton /></div>
            <div style={{ flex: '1 1 300px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}><h4 style={{ color: '#475569', marginTop: 0 }}>Web Components</h4><wc-modal></wc-modal><wc-state-button></wc-state-button></div>
            <div style={{ flex: '1 1 300px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ color: '#475569', marginTop: 0 }}>Vue.js</h4>
              <div><button style={{ background: '#10B981', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Открыть Vue Модалку</button></div>
              <div><button style={{ background: '#10B981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>+ Подписаться</button></div>
            </div>
            <div style={{ flex: '1 1 300px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ color: '#475569', marginTop: 0 }}>Angular</h4>
              <div><button style={{ background: '#DD0031', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Открыть Angular Модалку</button></div>
              <div><button style={{ background: '#DD0031', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>+ Подписаться</button></div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#0F172A', borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem' }}>Сложные интерактивные формы</h3>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}><h4 style={{ color: '#475569', marginTop: 0 }}>React</h4><ReactFeedbackForm /><ReactItemList /></div>
            <div style={{ flex: '1 1 300px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}><h4 style={{ color: '#475569', marginTop: 0 }}>Web Components</h4><wc-feedback-form></wc-feedback-form><wc-item-list></wc-item-list></div>
            <div style={{ flex: '1 1 300px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h4 style={{ color: '#475569', marginTop: 0 }}>Vue.js</h4>
              <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #ccc' }}>
                <input type="text" placeholder="Ваше имя" required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <input type="email" placeholder="Email" required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <textarea placeholder="Сообщение" required rows={3} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}></textarea>
                <button type="submit" style={{ background: '#10B981', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Отправить</button>
              </form>
              <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #ccc' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}><input type="text" placeholder="Новый элемент" style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} /><button type="button" style={{ background: '#10B981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Добавить</button></div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}><li style={{ color: '#6c757d', textAlign: 'center' }}>Список пуст</li></ul>
              </div>
            </div>
            <div style={{ flex: '1 1 300px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h4 style={{ color: '#475569', marginTop: 0 }}>Angular</h4>
              <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #ccc' }}>
                <input type="text" placeholder="Ваше имя" required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <input type="email" placeholder="Email" required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <textarea placeholder="Сообщение" required rows={3} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}></textarea>
                <button type="submit" style={{ background: '#DD0031', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Отправить</button>
              </form>
              <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #ccc' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}><input type="text" placeholder="Новый элемент" style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} /><button type="button" style={{ background: '#DD0031', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Добавить</button></div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}><li style={{ color: '#6c757d', textAlign: 'center' }}>Список пуст</li></ul>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div id="methodology" style={{ marginBottom: '2rem', scrollMarginTop: '80px' }}>
        <h2 style={{ fontSize: '2.25rem', margin: '0 0 0.5rem 0' }}>Методика и Тестирование</h2>
        <p style={{ color: '#475569', fontSize: '1.125rem', margin: 0 }}>Описание процесса измерений и QA</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <Card>
          <h3 style={{ marginTop: 0, color: '#0F172A' }}>Как собираются метрики</h3>
          <ul style={{ color: '#475569', lineHeight: 1.6, paddingLeft: '20px' }}>
            <li><b>Время загрузки:</b> измеряется через <code style={{background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px'}}>performance.mark()</code> от начала до FCP.</li>
            <li><b>Размер сборки:</b> анализ production-бандла Vite (папка <code style={{background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px'}}>dist/assets</code>).</li>
            <li><b>Сложность (1-10):</b> экспертная оценка объема boilerplate-кода и кривой обучения.</li>
            <li><b>Итоговый балл:</b> рассчитывается по формуле с весами: Производительность (25%), Размер (20%), Качество кода (25%) и т.д.</li>
          </ul>
          <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '1rem', fontStyle: 'italic' }}>* Часть метрик стенда задана как экспертно-демонстрационные для иллюстрации разницы подходов.</p>
        </Card>

        <Card>
          <h3 style={{ marginTop: 0, color: '#0F172A' }}>Процесс QA и CI/CD</h3>
          <ul style={{ color: '#475569', lineHeight: 1.6, paddingLeft: '20px' }}>
            <li><b>Unit-тесты:</b> проверка логики компонентов через <code style={{background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px'}}>Vitest</code>.</li>
            <li><b>Контейнеризация:</b> multi-stage сборка Docker (Node.js + Nginx).</li>
            <li><b>CI/CD:</b> автоматическая сборка и деплой на GitHub Pages через GitHub Actions при пуше в <code style={{background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px'}}>main</code>.</li>
          </ul>
          <div style={{ background: '#DCFCE7', color: '#166534', padding: '8px 12px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 600, display: 'inline-block', marginTop: '0.5rem' }}>
            ✓ Все конвейеры и тесты пройдены
          </div>
        </Card>
      </div>

      <Card id="conclusions" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', scrollMarginTop: '80px' }}>
        <h3 style={{ marginTop: 0, color: '#1E3A8A' }}>Выводы по результатам сравнения</h3>
        <ul style={{ color: '#1E3A8A', lineHeight: 1.6, paddingLeft: '20px', marginBottom: '1.5rem' }}>
          <li>🏆 <b>Самая быстрая и легковесная:</b> Web Components (0 зависимостей, мин. вес).</li>
          <li>🏆 <b>Лучшая поддержка и экосистема:</b> React / Vue (мощный инструментарий).</li>
          <li>🏆 <b>Лучшая для Enterprise:</b> Angular (встроенная архитектура).</li>
        </ul>
        <p style={{ marginTop: 0, color: '#1E3A8A', lineHeight: 1.6 }}>По результатам сравнения <b>Web Components</b> показали лучший результат по минимальному размеру сборки и отсутствию runtime-зависимостей. Однако сложность разработки на чистом API выше.</p>
        <p style={{ color: '#1E3A8A', lineHeight: 1.6 }}><b>React</b> и <b>Vue</b> показали более высокий уровень удобства разработки и поддержки, что делает их отличным выбором для сложных бизнес-приложений, несмотря на больший размер бандла.</p>
        <p style={{ marginBottom: 0, color: '#1E3A8A', lineHeight: 1.6 }}><b>Angular</b> уступает по размеру сборки и времени загрузки в рамках данного стенда, но остаётся мощным инструментом для крупных корпоративных приложений благодаря строгой архитектуре и развитой экосистеме.</p>
      </Card>
    </div>
  );
};