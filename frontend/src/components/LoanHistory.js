import React, { useState, useEffect } from 'react';
import { getLoans, returnBook } from '../services/loans';

function LoanHistory({ userId }) {
    const [loans, setLoans] = useState([]);

    const fetchLoans = async () => {
        try {
            const response = await getLoans();
            const userLoans = userId
                ? response.data.filter(loan => loan.user_id == userId)
                : response.data;
            setLoans(userLoans);
        } catch (error) {
            console.error('Error fetching loans', error);
        }
    };

    const handleReturn = async (loanId) => {
        try {
            const today = new Date().toISOString().split('T')[0];
            await returnBook(loanId, { return_date: today });
            
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
                    <li key={loan.loan_id || loan.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                        <strong>Book:</strong> {loan.book ? loan.book.title : 'Unknown'} <br/>
                        <strong>Status:</strong> {loan.book ? loan.book.status : 'N/A'} <br/>
                        
                        <strong>Borrowed:</strong> {loan.borrow_date} <br/>
                        <strong>Returned:</strong> {loan.return_date || 'Not Returned'} <br/>

                        {!loan.return_date && (
                            <button onClick={() => handleReturn(loan.loan_id)} style={{ marginTop: '5px', color: 'blue' }}>
                                Return Book
                            </button>
                        )}
                    </li>
                ))}
            </ul>  
        </div>
    );
}
export default LoanHistory;