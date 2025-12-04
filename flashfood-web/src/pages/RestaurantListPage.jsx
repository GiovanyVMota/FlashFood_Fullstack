import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function RestaurantListPage() {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        carregarRestaurantes();
    }, []);

    const carregarRestaurantes = () => {
        api.get('/restaurants').then(res => setRestaurants(res.data));
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation(); // Evita abrir o card ao clicar no deletar
        if (window.confirm('Tem certeza que deseja excluir este restaurante?')) {
            await api.delete(`/restaurants/${id}`);
            carregarRestaurantes();
        }
    };

    const handleEdit = (e, id) => {
        e.stopPropagation();
        navigate(`/restaurants/edit/${id}`);
    };

    return (
        <>
            <Header />
            <div className="container">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '30px 0 20px'}}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Lojas</h2>
                    <button onClick={() => navigate('/restaurants/new')} className="btn-primary" style={{width: 'auto', padding: '10px 20px'}}>
                        + Novo Restaurante
                    </button>
                </div>
                
                <div style={styles.grid}>
                    {restaurants.map(rest => (
                        <div 
                            key={rest.id} 
                            onClick={() => navigate(`/products/${rest.id}`)} 
                            style={styles.card}
                        >
                            <div style={styles.imageContainer}>
                                <img src={rest.imagemUrl} alt={rest.nome} style={styles.image} />
                            </div>
                            <div style={styles.info}>
                                <h3 style={styles.name}>{rest.nome}</h3>
                                <div style={styles.details}>
                                    <span style={styles.star}>★ {rest.nota}</span>
                                    <span style={styles.dot}>•</span>
                                    <span>{rest.categoria}</span>
                                </div>
                                
                                <div style={styles.actions}>
                                    <button onClick={(e) => handleEdit(e, rest.id)} style={styles.actionBtn}>Editar</button>
                                    <button onClick={(e) => handleDelete(e, rest.id)} style={{...styles.actionBtn, color: 'red'}}>Excluir</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
    },
    card: {
        backgroundColor: 'white',
        border: '1px solid #f0f0f0',
        borderRadius: '8px',
        padding: '15px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        transition: 'box-shadow 0.2s',
        position: 'relative'
    },
    imageContainer: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        width: '100%'
    },
    name: {
        fontSize: '16px',
        fontWeight: '600',
        margin: 0
    },
    details: {
        fontSize: '12px',
        color: '#717171',
        display: 'flex',
        alignItems: 'center'
    },
    star: { color: '#fcbb00', fontWeight: 'bold' },
    dot: { margin: '0 5px', color: '#ccc' },
    actions: {
        marginTop: '10px',
        display: 'flex',
        gap: '10px'
    },
    actionBtn: {
        fontSize: '12px',
        background: 'none',
        border: '1px solid #ccc',
        padding: '4px 8px',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};