import fetchApi from './index';

const getUsers = () => {
	return fetchApi.post('users/lists', {});
};

const addUser = () => {
	return fetchApi.post('users/add', {});
};

const removeUser = () => {
	return fetchApi.post('users/remove', {});
};

const updateUser = () => {
	return fetchApi.post('users/update', {});
};
