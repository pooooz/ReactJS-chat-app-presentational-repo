import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import React, { FC } from 'react';

import { selectAuth } from 'src/store/profile/selectors';

interface PrivateRouteProps {
  component?: JSX.Element;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ component }) => {
  const isAuth = useSelector(selectAuth);

  if (!isAuth) {
    return <Navigate to="/signin" />;
  }

  return component ? component : <Outlet />;
};
