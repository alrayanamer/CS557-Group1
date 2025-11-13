import api from './api';
export const getBooks = async () => {
    return api.get('/books/');
};
export const addBook = async (bookData) => {
    return api.post('/books/', bookData);
};
export const updateBook = async (bookId, bookData) => {
    return api.patch(`/books/${bookId}/`, bookData);
};
export const deleteBook = async (bookId) => {
    return api.delete(`/books/${bookId}/`);
};