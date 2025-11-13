import api from './api';
export const getUsers = async () => {
    return api.get('/users/');
};
export const updateUser = async (userId, userData) => {
    return api.patch(`/users/${userId}/`, userData);
};
export const deleteUser = async (userId) => {
    return api.delete(`/users/${userId}/`);
};