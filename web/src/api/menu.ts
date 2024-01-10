import { IMenu } from '@/interface/menu';
import fetchApi from './index';

const prefix = 'menu';
export const getMenuListApi = (): Promise<IMenu[]> => {
	return fetchApi.post<IMenu[]>(`${prefix}/list`, {});
};

export const addMenuApi = () => {
	return fetchApi.post(`${prefix}/add`, {});
};

export const removeMenuApi = () => {
	return fetchApi.post(`${prefix}/remove`, {});
};

export const updateMenuApi = () => {
	return fetchApi.post(`${prefix}/update`, {});
};
