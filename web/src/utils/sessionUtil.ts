export default class SessionUtils {
	static getToken() {
		return window.localStorage.getItem('token');
	}

	static removeToken() {
		window.localStorage.removeItem('token');
	}

	static setToken(token: string) {
		window.localStorage.setItem('token', token);
	}
}
