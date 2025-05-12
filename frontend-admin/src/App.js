import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

// Các trang khác sẽ được thêm sau
// import Products from './pages/Products';
// import Categories from './pages/Categories';
// import Orders from './pages/Orders';
// import Users from './pages/Users';

// Kiểm tra nếu đã đăng nhập
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          } 
        />

        {/* Redirect to dashboard from root */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Tương tự cho các trang khác */}
        {/* <Route 
          path="/admin/products" 
          element={
            <PrivateRoute>
              <Layout>
                <Products />
              </Layout>
            </PrivateRoute>
          } 
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
