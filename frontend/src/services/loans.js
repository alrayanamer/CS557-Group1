import api from './api';
export const getLoans = async () => {
    return api.get('/loans/');
};
export const borrowBook = async (loanData) => {
    return api.post('/loans/', loanData);
};
export const returnBook = async (loanId, returnData) => {
    return api.patch(`/loans/${loanId}/`, returnData);
};