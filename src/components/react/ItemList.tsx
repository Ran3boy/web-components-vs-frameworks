import React, { useState } from 'react';

export const ReactItemList: React.FC = () => {
  const [items, setItems] = useState<string[]>(['Элемент 1', 'Элемент 2']);
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #ccc' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Новый элемент"
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleAdd} style={{ background: '#007bff', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Добавить</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item, index) => (
          <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', background: '#f8f9fa', borderRadius: '4px', border: '1px solid #e9ecef' }}>
            <span>{item}</span>
            <button onClick={() => handleRemove(index)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Удалить</button>
          </li>
        ))}
        {items.length === 0 && <li style={{ color: '#6c757d', textAlign: 'center' }}>Список пуст</li>}
      </ul>
    </div>
  );
};