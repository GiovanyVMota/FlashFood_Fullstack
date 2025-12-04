import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRestaurants } from '../services/api';

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getRestaurants()
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error("Erro ao buscar restaurantes:", err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Olá, {user?.nome || 'Usuário'}!</h2>
        <button onClick={() => { localStorage.clear(); navigate('/'); }} style={{ padding: '5px 10px' }}>Sair</button>
      </header>

      <h3>Restaurantes Disponíveis</h3>
      <div style={gridStyle}>
        {restaurants.map((rest) => (
          <div 
            key={rest.id} 
            onClick={() => navigate(`/menu/${rest.id}`)}
            style={cardStyle}
          >
            <img 
              src={rest.imagemUrl || 'https://via.placeholder.com/300x150'} 
              alt={rest.nome} 
              style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} 
            />
            <div style={{ padding: '10px' }}>
              <h4 style={{ margin: '0 0 5px 0' }}>{rest.nome}</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{rest.categoria} • ⭐ {rest.nota}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px',
  marginTop: '20px'
};

const cardStyle = {
  border: '1px solid #eee',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  backgroundColor: 'white'
};

export default RestaurantsPage;