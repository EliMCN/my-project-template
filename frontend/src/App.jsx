import { useEffect, useState } from 'react';

export default function App() {
  const [status, setStatus] = useState('checking...');

  useEffect(() => {
    fetch('http://localhost:4000/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji' }}>
      <h1>🚀 Proyecto Base Template(React + Express)</h1>
      <p>Backend /health: <strong>{status}</strong></p>
      <p style={{opacity:0.7}}>Frontend: Vite (5173) — Backend: Express (4000)</p>
    </div>
  );
}
