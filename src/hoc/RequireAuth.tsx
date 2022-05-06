import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ERoutes } from '../App';
import Spinner from '../components/Spinner/Spinner';
import { useAuth } from '../hook/useAuth';

interface IRequireAuth {
  children: JSX.Element;
}

const RequireAuth:FC<IRequireAuth> = ({ children }) => {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to={ERoutes.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
