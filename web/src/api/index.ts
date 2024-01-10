import { baseUrl } from '../config';

interface FetchApiOptions {
	requestInterceptors?: ((config: RequestInit) => RequestInit)[];
	responseInterceptors?: ((data: any) => any | Promise<any>)[];
}

interface BaseResponse<T = any> {
	data: T;
	error: string;
	success: boolean;
}

class FetchApi {
	private baseUrl = baseUrl;
	private requestInterceptors: ((config: RequestInit) => RequestInit)[] = [];
	private responseInterceptors: ((data: any) => any | Promise<any>)[] = [];

	constructor(options?: FetchApiOptions) {
		if (options) {
			this.requestInterceptors = options.requestInterceptors || [];
			this.responseInterceptors = options.responseInterceptors || [];
		}
	}

	private async request<T>(url: string, options: RequestInit): Promise<T> {
		const finalOptions = await this.applyRequestInterceptors(options);

		const response = await fetch(`${this.baseUrl}/${url}`, finalOptions);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const responseData: BaseResponse<T> = await response.json();

		const finalResponse = await this.applyResponseInterceptors(responseData);

		return finalResponse;
	}

	public get<T>(url: string, params?: Record<string, any>): Promise<T> {
		const queryParams = new URLSearchParams(params).toString();
		return this.request<T>(`${url}?${queryParams}`, {
			method: 'GET',
		});
	}

	public post<T, K = any>(url: string, params?: K): Promise<T> {
		return this.request<T>(url, {
			method: 'POST',
			body: params !== undefined ? JSON.stringify(params) : undefined,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	public uploadFile() {
		// Implementation for uploading files
	}

	public downloadFile() {
		// Implementation for downloading files
	}

	private async applyRequestInterceptors(config: RequestInit): Promise<RequestInit> {
		let finalConfig = config;

		for (const interceptor of this.requestInterceptors) {
			finalConfig = await interceptor(finalConfig);
		}

		return finalConfig;
	}

	private async applyResponseInterceptors(data: any): Promise<any> {
		let finalData = data;

		for (const interceptor of this.responseInterceptors) {
			finalData = await interceptor(finalData);
		}

		return finalData;
	}

	// Add request interceptor
	public addRequestInterceptor(interceptor: (config: RequestInit) => RequestInit): void {
		this.requestInterceptors.push(interceptor);
	}

	// Add response interceptor
	public addResponseInterceptor(interceptor: (data: any) => any | Promise<any>): void {
		this.responseInterceptors.push(interceptor);
	}
}

const fetchApi = new FetchApi();
fetchApi.addResponseInterceptor(async (data: any) => {
	return data.data;
});

export default fetchApi;
