import React from 'react';
import { Card } from './Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  valueColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, valueColor = '#0F172A' }) => (
  <Card style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 200px' }}>
    <span style={{ color: '#475569', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</span>
    <span style={{ color: valueColor, fontSize: '2rem', fontWeight: 800 }}>{value}</span>
    {subtitle && <span style={{ color: '#64748B', fontSize: '0.875rem' }}>{subtitle}</span>}
  </Card>
);