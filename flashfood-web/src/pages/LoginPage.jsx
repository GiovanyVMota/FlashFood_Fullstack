import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, senha });
      // Salva o usuário retornado pelo backend (id, nome, token)
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/restaurants');
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={{ textAlign: 'center', color: '#ff6b6b' }}>FlashFood ⚡</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={styles.input}
            required
          />
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
          <button type="submit" style={styles.button}>Entrar</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
  card: { padding: '40px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '300px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #ddd' },
  button: { padding: '12px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }
};

export default LoginPage;