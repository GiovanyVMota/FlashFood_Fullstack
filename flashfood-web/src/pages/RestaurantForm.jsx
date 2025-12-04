import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/Header';

export default function RestaurantForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        categoria: '',
        emailProprietario: '',
        imagemUrl: ''
    });

    useEffect(() => {
        if (id) {
            // Se tem ID, é edição: busca os dados atuais
            api.get('/restaurants').then(res => {
                const restaurant = res.data.find(r => r.id == id);
                if (restaurant) setFormData(restaurant);
            });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await api.put(`/restaurants/${id}`, formData);
                alert('Restaurante atualizado!');
            } else {
                await api.post('/restaurants', formData);
                alert('Restaurante criado!');
            }
            navigate('/restaurants');
        } catch (error) {
            alert('Erro ao salvar restaurante.');
        }
    };

    return (
        <>
            <Header showSearch={false} />
            <div className="container">
                <h2 style={{margin: '20px 0'}}>{id ? 'Editar Restaurante' : 'Novo Restaurante'}</h2>
                <form onSubmit={handleSubmit} style={{maxWidth: '500px'}}>
                    <input 
                        className="input-field" 
                        placeholder="Nome do Restaurante"
                        value={formData.nome}
                        onChange={e => setFormData({...formData, nome: e.target.value})}
                        required
                    />
                    <input 
                        className="input-field" 
                        placeholder="Categoria (ex: Lanches, Pizza)"
                        value={formData.categoria}
                        onChange={e => setFormData({...formData, categoria: e.target.value})}
                        required
                    />
                    <input 
                        className="input-field" 
                        placeholder="Email do Proprietário"
                        value={formData.emailProprietario}
                        onChange={e => setFormData({...formData, emailProprietario: e.target.value})}
                        required
                    />
                    <input 
                        className="input-field" 
                        placeholder="URL da Imagem (Logo)"
                        value={formData.imagemUrl}
                        onChange={e => setFormData({...formData, imagemUrl: e.target.value})}
                    />
                    
                    <button type="submit" className="btn-primary">SALVAR</button>
                    <button 
                        type="button" 
                        className="btn-outline" 
                        onClick={() => navigate('/restaurants')}
                        style={{marginTop: '10px'}}
                    >
                        CANCELAR
                    </button>
                </form>
            </div>
        </>
    );
}