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

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h2>Reports</h2>
      <h2>Login Activity</h2>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: period === p.value ? '2px solid #ff7043' : '1px solid #ccc',
              background: period === p.value ? '#ffe0b2' : '#fff',
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="logins" stroke="#ff7043" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
      <p style={{ marginTop: '1rem', color: '#888' }}>
        Showing simulated login activity for the selected period.
      </p>
    </div>
  );
}

export default Reports;
