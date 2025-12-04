import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/Header';

export default function ProductListPage() {
    const { restaurantId } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        carregarProdutos();
    }, [restaurantId]);

    const carregarProdutos = () => {
        api.get(`/products?restaurant_id=${restaurantId}`).then(res => setProducts(res.data));
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            await api.delete(`/products/${id}`);
            carregarProdutos();
        }
    };

    return (
        <>
            <Header showSearch={false} />
            
            <div style={styles.restaurantBanner}>
                <div className="container">
                    <h2 style={{fontSize: '28px'}}>Cardápio</h2>
                    <button 
                        onClick={() => navigate(`/products/${restaurantId}/new`)} 
                        className="btn-primary" 
                        style={{width: 'auto', padding: '10px 20px', marginTop: '10px'}}
                    >
                        + Adicionar Produto
                    </button>
                </div>
            </div>

            <div className="container">
                <h3 style={{margin: '30px 0 20px', fontSize: '18px', fontWeight: 'bold'}}>Destaques</h3>
                
                <div style={styles.list}>
                    {products.map(prod => (
                        <div key={prod.id} style={styles.itemCard}>
                            <div style={styles.itemInfo}>
                                <h4 style={styles.itemTitle}>{prod.nome}</h4>
                                <p style={styles.itemDesc}>{prod.descricao}</p>
                                <span style={styles.itemPrice}>
                                    R$ {prod.preco.toFixed(2).replace('.', ',')}
                                </span>
                                
                                <div style={styles.actions}>
                                    <button 
                                        onClick={() => navigate(`/products/${restaurantId}/edit/${prod.id}`)} 
                                        style={styles.actionBtn}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(prod.id)} 
                                        style={{...styles.actionBtn, color: 'red', borderColor: 'red'}}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                            {prod.imagemUrl && (
                                <div style={styles.itemImageContainer}>
                                    <img src={prod.imagemUrl} alt={prod.nome} style={styles.itemImage} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

const styles = {
    restaurantBanner: {
        backgroundColor: '#fff',
        padding: '40px 0',
        borderBottom: '1px solid #eee'
    },
    list: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px'
    },
    itemCard: {
        backgroundColor: 'white',
        border: '1px solid #f2f2f2',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '140px'
    },
    itemInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingRight: '10px',
        flex: 1
    },
    itemTitle: {
        fontSize: '16px',
        fontWeight: '500',
        color: '#3e3e3e',
        marginBottom: '8px'
    },
    itemDesc: {
        fontSize: '12px',
        color: '#717171',
        lineHeight: '1.4',
        marginBottom: '10px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
    },
    itemPrice: {
        fontSize: '14px',
        color: '#00a296',
        fontWeight: 'bold'
    },
    itemImageContainer: {
        width: '120px',
        height: '100%',
        borderRadius: '8px',
        overflow: 'hidden'
    },
    itemImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
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