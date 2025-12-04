import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RestaurantsPage from './pages/RestaurantsPage';
import MenuPage from './pages/MenuPage';

// Componente simples para proteger rotas (se não logado -> vai pra login)
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/restaurants" 
          element={
            <PrivateRoute>
              <RestaurantsPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/menu/:id" 
          element={
            <PrivateRoute>
              <MenuPage />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;