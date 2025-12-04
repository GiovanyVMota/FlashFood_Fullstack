import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Envia nome, email e senha (compatível com User.java do Spring)
            const response = await api.post('/register', { nome, email, senha });
            
            // Sucesso: Salva o usuário e vai para a home
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/restaurants');
            
        } catch (error) {
            console.error("Erro no cadastro:", error);
            // Tenta pegar a mensagem de erro específica do Backend (ex: Email já cadastrado)
            const msg = error.response?.data?.message || 'Erro ao criar conta. Tente novamente.';
            alert(msg);
        }
    };

    return (
        <div style={styles.container}>
            {/* Lado Esquerdo: Vermelho Branding */}
            <div style={styles.leftPanel}>
                <div style={{textAlign: 'center'}}>
                    <h1 style={{color: 'white', fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px'}}>FlashFood</h1>
                    <p style={{color: 'white', opacity: 0.9, fontSize: '1.2rem'}}>Tudo pra matar sua fome</p>
                </div>
            </div>
            
            {/* Lado Direito: Formulário Branco */}
            <div style={styles.rightPanel}>
                <div style={styles.formContainer}>
                    <h2 style={styles.title}>Crie sua conta</h2>
                    <p style={{color: '#717171', marginBottom: '30px'}}>Preencha seus dados abaixo</p>
                    
                    <form onSubmit={handleRegister}>
                        <label style={styles.label}>Nome Completo</label>
                        <input 
                            className="input-field"
                            placeholder="Ex: João da Silva" 
                            value={nome}
                            onChange={e => setNome(e.target.value)} 
                            required
                        />

                        <label style={styles.label}>E-mail</label>
                        <input 
                            className="input-field"
                            type="email"
                            placeholder="seu@email.com" 
                            value={email}
                            onChange={e => setEmail(e.target.value)} 
                            required
                        />

                        <label style={styles.label}>Senha</label>
                        <input 
                            className="input-field"
                            type="password" 
                            placeholder="Mínimo 6 caracteres" 
                            value={senha}
                            onChange={e => setSenha(e.target.value)} 
                            required
                        />

                        <button type="submit" className="btn-primary" style={{marginTop: '10px'}}>
                            Continuar
                        </button>
                    </form>

                    <div style={styles.divider}>ou</div>

                    <button 
                        className="btn-outline"
                        onClick={() => navigate('/')}
                    >
                        Já tenho uma conta
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
        backgroundColor: '#EA1D2C', // Vermelho iFood
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // Em telas pequenas (mobile), geralmente escondemos esse painel via CSS media query
        // mas aqui deixamos visível ou usamos display: 'none' se quiser mobile-only.
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
        padding: '40px',
        textAlign: 'left' // Alinhamento mais profissional
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: '#3e3e3e'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        color: '#717171',
        fontSize: '14px',
        fontWeight: '600'
    },
    divider: {
        margin: '25px 0',
        textAlign: 'center',
        color: '#ccc',
        fontSize: '14px',
        position: 'relative'
    }
};