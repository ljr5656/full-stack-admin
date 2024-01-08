import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, auth }) => {
	return auth.isAuthenticated ? element : <Navigate to='/login' replace />;
};

export default PrivateRoute;
