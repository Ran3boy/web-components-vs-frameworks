import React from 'react';
import { Product } from '../../types';

interface Props {
  product: Product;
  onAddToCart: (id: string) => void;
}

export const ReactProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  return (
    <div className="react-product-card">
      <img src={product.imageUrl} alt={product.name} />
      <div className="content">
        <h4>{product.name} (React)</h4>
        <p>{product.description}</p>
        <div className="price">{product.price} ₽</div>
        <button onClick={() => onAddToCart(product.id)}>В корзину</button>
      </div>
    </div>
  );
};