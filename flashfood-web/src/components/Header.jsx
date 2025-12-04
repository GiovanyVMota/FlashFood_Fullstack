import { useNavigate } from 'react-router-dom';

export default function Header({ showSearch = true }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <header style={styles.header}>
            <div style={styles.content}>
                <h1 onClick={() => navigate('/restaurants')} style={styles.logo}>
                    FlashFood
                </h1>
                
                {showSearch && (
                    <div style={styles.searchContainer}>
                        <input 
                            placeholder="Buscar item ou loja" 
                            style={styles.searchInput} 
                        />
                    </div>
                )}

                <div style={styles.userProfile}>
                    <span>Olá, {user.nome || 'Visitante'}</span>
                    <button onClick={() => navigate('/')} style={styles.logoutBtn}>Sair</button>
                </div>
            </div>
        </header>
    );
}

const styles = {
    header: {
        backgroundColor: '#fff',
        padding: '15px 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
    },
    logo: {
        color: '#EA1D2C',
        fontSize: '24px',
        fontWeight: '800',
        cursor: 'pointer',
        margin: 0
    },
    searchContainer: {
        flex: 1,
        maxWidth: '600px'
    },
    searchInput: {
        width: '100%',
        padding: '10px 15px',
        backgroundColor: '#f2f2f2',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px'
    },
    userProfile: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        fontSize: '14px',
        color: '#717171'
    },
    logoutBtn: {
        color: '#EA1D2C',
        background: 'none',
        fontWeight: 'bold'
    }
};