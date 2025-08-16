import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

const PERIODS = [
  { label: '7 Days', value: 7 },
  { label: '30 Days', value: 30 },
  { label: '90 Days', value: 90 },
  { label: '1 Year', value: 365 },
];

function generateLoginData(days) {
  const data = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    data.push({
      date: date.toISOString().slice(0, 10),
      logins: Math.floor(Math.random() * 20) + 5,
    });
  }
  return data;
}

function Reports() {
  const [period, setPeriod] = useState(PERIODS[0].value);
  const data = generateLoginData(period);
  const { theme } = useTheme();
  
  const isDarkTheme = theme === 'minimal-dark';

  return (
    <div style={{ 
      maxWidth: 800, 
      margin: '0 auto', 
      padding: '2rem',
      background: isDarkTheme ? 'var(--bg-primary)' : 'transparent',
      minHeight: '100vh',
      color: isDarkTheme ? 'var(--text-primary)' : 'inherit'
    }}>
      <h2 style={{ color: isDarkTheme ? 'var(--text-primary)' : 'inherit' }}>Reports</h2>
      <h2 style={{ color: isDarkTheme ? 'var(--text-primary)' : 'inherit' }}>Login Activity</h2>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: period === p.value ? 
                (isDarkTheme ? '2px solid var(--accent-color)' : '2px solid #ff7043') : 
                (isDarkTheme ? '1px solid var(--border-color)' : '1px solid #ccc'),
              background: period === p.value ? 
                (isDarkTheme ? 'var(--bg-tertiary)' : '#ffe0b2') : 
                (isDarkTheme ? 'var(--bg-secondary)' : '#fff'),
              color: isDarkTheme ? 'var(--text-primary)' : 'inherit',
              cursor: 'pointer',
              fontWeight: period === p.value ? 'bold' : 'normal',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? 'var(--border-color)' : '#ccc'} />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: isDarkTheme ? 'var(--text-secondary)' : '#333' }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: isDarkTheme ? 'var(--text-secondary)' : '#333' }} />
          <Tooltip 
            contentStyle={{
              backgroundColor: isDarkTheme ? 'var(--bg-secondary)' : '#fff',
              border: isDarkTheme ? '1px solid var(--border-color)' : '1px solid #ccc',
              borderRadius: '8px',
              color: isDarkTheme ? 'var(--text-primary)' : '#333'
            }}
          />
          <Line type="monotone" dataKey="logins" stroke={isDarkTheme ? 'var(--accent-color)' : '#ff7043'} strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
      <p style={{ marginTop: '1rem', color: isDarkTheme ? 'var(--text-secondary)' : '#888' }}>
        Showing simulated login activity for the selected period.
      </p>
    </div>
  );
}

export default Reports;
