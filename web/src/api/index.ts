import { baseUrl } from '../config';
interface FetchApiOptions {}
class FetchApi {
	baseUrl = baseUrl;
	interceptors_req = [];
	interceptors_res = [];
	interceptors = {
		request: {
			use: function (callback) {
				this.interceptors_req.push();
			},
		},
		response: {
			use: function (callback) {
				this.interceptors_res.push();
			},
		},
	};
	constructor() {}
	private async request(url, options: RequestInit) {
		fetch(`${baseUrl}/${url}`, {
			method: options.method,
		}).then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		});
	}

	public get<T>(url, param: T) {}

	public post<T>(url, param: T) {
		return this.request(url, {
			method: 'POST',
			body: JSON.stringify(param),
		});
	}

	public upload_file() {}

	public download_file() {}
}

export default new FetchApi();
