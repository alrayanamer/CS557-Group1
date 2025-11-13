import api from './api';
export const login = async (email, password) => {
    return api.post('/login/', {email, password});
};
export const register = async (userData) => {
    return api.post('/register/', userData);
};