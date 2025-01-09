'use client';
import './login.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), 
      });
  
      if (!res.ok) {
        const { message } = await res.json(); 
        setError(message); 
        return;
      }
  
      router.push('/'); 
    } catch (err) {
      console.error(err);  
      setError('An unexpected error occurred.');
    }
  };
  

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
