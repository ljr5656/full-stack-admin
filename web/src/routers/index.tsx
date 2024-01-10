import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RouteProvider as CustomRouteProvider } from './context';
import BasicLayout from '@/layouts/basicLayout/index';
import Login from '@/pages/login/index';

export const initialRoutes: RouteObject[] = [
	{
		path: '/user/login',
		Component: Login,
	},
	{
		path: '*',
		Component: BasicLayout,
	},
];

export const router = createBrowserRouter(initialRoutes);

const Router: React.FC = () => {
	return (
		<CustomRouteProvider initialRoutes={initialRoutes}>
			<RouterProvider router={router}></RouterProvider>
		</CustomRouteProvider>
	);
};

export default Router;
