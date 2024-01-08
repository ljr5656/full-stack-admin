import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Login from '@/pages/login';
import SessionUtils from '@/utils/session';

const AuthContext = createContext(undefined);
const AuthProvider = ({ children }: any) => {
	const [token, setToken_] = useState(SessionUtils.getToken());
	const setToken = newToken => {
		setToken_(newToken);
	};
	useEffect(() => {
		if (token) {
			SessionUtils.setToken(token);
		} else {
			SessionUtils.removeToken();
		}
	}, [token]);

	const contextValue = useMemo(
		() => ({
			token,
			setToken,
		}),
		[token],
	);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
export default AuthProvider;
