import React, { useState } from 'react';

export const ReactModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        style={{ background: '#007bff', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Открыть React Модалку
      </button>
      
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', zIndex: 1000
          }}
        >
          <div 
            onClick={e => e.stopPropagation()} 
            style={{ background: 'white', padding: '24px', borderRadius: '8px', minWidth: '300px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
          >
            <h3 style={{ marginTop: 0 }}>React Modal</h3>
            <p>Это модальное окно реализовано на React. Состояние управляется через хук <code>useState</code>.</p>
            <button onClick={() => setIsOpen(false)} style={{ marginTop: '16px', background: '#dc3545', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};