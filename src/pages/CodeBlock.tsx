import React from 'react';

export const CodeBlock: React.FC<{ code: string; title?: string }> = ({ code, title }) => (
  <div style={{ background: '#0F172A', borderRadius: '8px', overflow: 'hidden', marginTop: '1rem', border: '1px solid #1E293B' }}>
    {title && (
      <div style={{ background: '#1E293B', color: '#94A3B8', padding: '8px 16px', fontSize: '0.75rem', fontWeight: 600, borderBottom: '1px solid #334155' }}>
        {title}
      </div>
    )}
    <pre style={{ margin: 0, padding: '16px', color: '#F8FAFC', fontSize: '0.875rem', overflowX: 'auto', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>
      <code>{code}</code>
    </pre>
  </div>
);