import React from 'react';
import { Product } from '../../types';

interface Props {
  product: Product;
  onAddToCart: (id: string) => void;
}

export const ReactProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  return (
    <div style={{ background: 'white', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h4 style={{ marginTop: 0, marginBottom: '8px' }}>{product.name} (React)</h4>
        <p style={{ color: '#666', marginBottom: '16px', flex: 1 }}>{product.description}</p>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px' }}>{product.price} ₽</div>
        <button onClick={() => onAddToCart(product.id)} style={{ background: '#007bff', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>В корзину</button>
      </div>
    </div>
  );
};