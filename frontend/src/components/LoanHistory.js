import React, { useState, useEffect } from 'react';
import { getLoans, returnBook } from '../services/loans';

function LoanHistory({ userId }) {
    const [loans, setLoans] = useState([]);

    const fetchLoans = async () => {
        try {
            const response = await getLoans();
            const userLoan = userId
                ? response.data.filter(loan => loan.user_id === userId)
                : response.data;
            setLoans(userLoan);
        } catch (error) {
            alert('Error fetching loans');
            console.error(error);
        }
    };
     const handleReturn = async (loanId) => {
        try {
           await returnBook(loanId);
            alert('Book returned');
            fetchLoans();
        } catch (error) {
            alert('Error returning book');
            console.error(error);
        }
    };
    useEffect(() => { fetchLoans(); }, [userId]);
    return (
        <div>
            <h2>Loan History</h2>
            <ul>
                {loans.map(loan => (
                    <li key={loan.loan_id || loan.id}>
                        Book ID: {loan.book_id}, Status: {loan.status}, Borrowed: {loan.borrow_date}, Returned: {loan.return_date || 'Not Returned'}
                        {!loan.return_date && (
                        <button onClick={() => handleReturn(loan.loan_id)}>Return Book</button>
                        )}
                    </li>
                ))}
            </ul>  
        </div>
    );
}
export default LoanHistory;