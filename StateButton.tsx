import React, { useState } from 'react';

export const ReactStateButton: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsSubscribed(!isSubscribed)}
        style={{
          background: isSubscribed ? '#6c757d' : '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'background 0.3s ease'
        }}
      >
        {isSubscribed ? '✓ Вы подписаны' : '+ Подписаться'}
      </button>
    </div>
  );
};