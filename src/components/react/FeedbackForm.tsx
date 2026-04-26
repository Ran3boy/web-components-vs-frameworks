import React, { useState } from 'react';

export const ReactFeedbackForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitted');
    e.currentTarget.reset();
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #ccc' }}>
      <input type="text" placeholder="Ваше имя" required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
      <input type="email" placeholder="Email" required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
      <textarea placeholder="Сообщение" required rows={3} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}></textarea>
      <button 
        type="submit" 
        style={{ background: status === 'submitted' ? '#28a745' : '#007bff', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.3s' }}
      >
        {status === 'submitted' ? '✓ Отправлено!' : 'Отправить'}
      </button>
    </form>
  );
};