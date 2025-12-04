import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RestaurantListPage from './pages/RestaurantListPage';
import ProductListPage from './pages/ProductListPage';
import RestaurantForm from './pages/RestaurantForm'; // NOVO
import ProductForm from './pages/ProductForm';       // NOVO

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Rotas de Restaurante */}
        <Route path="/restaurants" element={<RestaurantListPage />} />
        <Route path="/restaurants/new" element={<RestaurantForm />} />
        <Route path="/restaurants/edit/:id" element={<RestaurantForm />} />

        {/* Rotas de Produto */}
        <Route path="/products/:restaurantId" element={<ProductListPage />} />
        <Route path="/products/:restaurantId/new" element={<ProductForm />} />
        <Route path="/products/:restaurantId/edit/:productId" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;