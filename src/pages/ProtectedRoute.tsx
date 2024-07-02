import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/services/supabase/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Verificando autenticação...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
