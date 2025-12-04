import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <img 
        src={product.imagemUrl || 'https://via.placeholder.com/80'} 
        alt={product.nome}
        style={styles.image} 
      />
      <div style={styles.info}>
        <h4 style={{ margin: '0 0 5px 0' }}>{product.nome}</h4>
        <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#555' }}>
          {product.descricao || 'Sem descrição'}
        </p>
        <span style={{ fontWeight: 'bold', color: '#27ae60' }}>
          R$ {product.preco?.toFixed(2)}
        </span>
      </div>
      <button style={styles.addButton}>+</button>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: 'white',
    alignItems: 'center',
    gap: '15px'
  },
  image: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    objectFit: 'cover'
  },
  info: {
    flex: 1
  },
  addButton: {
    background: '#ff6b6b',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    fontSize: '18px'
  }
};

export default ProductCard;