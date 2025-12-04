import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/Header';

export default function ProductForm() {
    const { restaurantId, productId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        categoria: '',
        imagemUrl: '',
        restaurantId: restaurantId
    });

    useEffect(() => {
        if (productId) {
            api.get(`/products?restaurant_id=${restaurantId}`).then(res => {
                const product = res.data.find(p => p.id == productId);
                if (product) setFormData(product);
            });
        }
    }, [productId, restaurantId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (productId) {
                await api.put(`/products/${productId}`, formData);
                alert('Produto atualizado!');
            } else {
                await api.post('/products', formData);
                alert('Produto criado!');
            }
            navigate(`/products/${restaurantId}`);
        } catch (error) {
            alert('Erro ao salvar produto.');
        }
    };

    return (
        <>
            <Header showSearch={false} />
            <div className="container">
                <h2 style={{margin: '20px 0'}}>{productId ? 'Editar Produto' : 'Novo Produto'}</h2>
                <form onSubmit={handleSubmit} style={{maxWidth: '500px'}}>
                    <input 
                        className="input-field" 
                        placeholder="Nome do Produto"
                        value={formData.nome}
                        onChange={e => setFormData({...formData, nome: e.target.value})}
                        required
                    />
                    <textarea 
                        className="input-field" 
                        placeholder="Descrição"
                        value={formData.descricao}
                        onChange={e => setFormData({...formData, descricao: e.target.value})}
                        rows="3"
                    />
                    <input 
                        className="input-field" 
                        placeholder="Preço (ex: 29.90)"
                        type="number"
                        step="0.01"
                        value={formData.preco}
                        onChange={e => setFormData({...formData, preco: e.target.value})}
                        required
                    />
                    <input 
                        className="input-field" 
                        placeholder="Categoria (ex: Bebida, Lanche)"
                        value={formData.categoria}
                        onChange={e => setFormData({...formData, categoria: e.target.value})}
                        required
                    />
                    <input 
                        className="input-field" 
                        placeholder="URL da Imagem do Produto"
                        value={formData.imagemUrl}
                        onChange={e => setFormData({...formData, imagemUrl: e.target.value})}
                    />
                    
                    <button type="submit" className="btn-primary">SALVAR</button>
                    <button 
                        type="button" 
                        className="btn-outline" 
                        onClick={() => navigate(`/products/${restaurantId}`)}
                        style={{marginTop: '10px'}}
                    >
                        CANCELAR
                    </button>
                </form>
            </div>
        </>
    );
}