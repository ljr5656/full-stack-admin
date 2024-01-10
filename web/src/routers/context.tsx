// RouteContext.tsx
import React, { createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { RouteObject } from 'react-router-dom';

interface ContextProps {
	routes: RouteObject[];
	updateRoutes: Dispatch<SetStateAction<RouteObject[]>>;
}

const RouteContext = createContext<ContextProps | undefined>(undefined);

export const useRouteContext = () => {
	const context = useContext(RouteContext);
	if (!context) {
		throw new Error('useRouteContext must be used within a RouteProvider');
	}
	return context;
};

interface RouteProviderProps {
	children: ReactNode;
	initialRoutes: RouteObject[];
}

export const RouteProvider: React.FC<RouteProviderProps> = ({ children, initialRoutes }) => {
	const [routes, setRoutes] = React.useState<RouteObject[]>(initialRoutes);

	const updateRoutes: Dispatch<SetStateAction<RouteObject[]>> = newRoutes => {
		setRoutes(prevRoutes => {
			if (typeof newRoutes === 'function') {
				return newRoutes(prevRoutes);
			} else {
				return newRoutes;
			}
		});
	};

	return <RouteContext.Provider value={{ routes, updateRoutes }}>{children}</RouteContext.Provider>;
};
