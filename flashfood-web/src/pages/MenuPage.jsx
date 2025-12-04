import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMenu } from '../services/api';
import ProductCard from '../components/ProductCard';

const MenuPage = () => {
  const { id } = useParams(); // Pega o ID do restaurante da URL
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMenu(id)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Erro ao buscar menu:", err));
  }, [id]);

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', cursor: 'pointer' }}>
        ← Voltar
      </button>
      
      <h3>Cardápio</h3>
      
      {products.length === 0 ? (
        <p>Nenhum produto encontrado neste restaurante.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;