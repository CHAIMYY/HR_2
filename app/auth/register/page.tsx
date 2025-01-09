'use client';
import './register.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        setError(message);
        return;
      }

      router.push('/auth/login');
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Register</h1>
      {error && <p>{error}</p>}
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
