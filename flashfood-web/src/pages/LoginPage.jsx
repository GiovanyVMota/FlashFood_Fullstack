import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { email, senha });
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/restaurants');
        } catch (error) {
            alert('Email ou senha inválidos');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftPanel}>
                <h1 style={{color: 'white', fontSize: '3rem', margin: '40px'}}>FlashFood</h1>
            </div>
            
            <div style={styles.rightPanel}>
                <div style={styles.formContainer}>
                    <h2 style={styles.title}>Falta pouco para matar sua fome!</h2>
                    <p style={{color: '#717171', marginBottom: '30px'}}>Como deseja continuar?</p>
                    
                    <form onSubmit={handleLogin}>
                        <input 
                            className="input-field"
                            placeholder="Email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)} 
                        />
                        <input 
                            className="input-field"
                            type="password" 
                            placeholder="Senha" 
                            value={senha}
                            onChange={e => setSenha(e.target.value)} 
                        />
                        <button type="submit" className="btn-primary">
                            Entrar
                        </button>
                    </form>

                    <div style={styles.divider}>ou</div>

                    <button 
                        className="btn-outline"
                        onClick={() => navigate('/register')}
                    >
                        Criar conta nova
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        width: '100vw'
    },
    leftPanel: {
        flex: 1,
        backgroundColor: '#EA1D2C',
        display: 'flex', // UNICO display aqui
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightPanel: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        textAlign: 'center'
    },
    title: {
        fontSize: '24px',
        marginBottom: '10px',
        color: '#3e3e3e'
    },
    divider: {
        margin: '20px 0',
        color: '#ccc',
        fontSize: '14px'
    }
};