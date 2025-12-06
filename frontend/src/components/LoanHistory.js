import React, { useState, useEffect } from 'react';
import { getLoans, returnBook } from '../services/loans';

function LoanHistory({ userId }) {
    const [loans, setLoans] = useState([]);

    const fetchLoans = async () => {
        try {
            const response = await getLoans();
            const userLoans = userId
                ? response.data.filter(loan => {
                    console.log(`Comparing loan.user_id (${loan.user_id}) with userId (${userId})`);
                        const loanUserId = loan.user?.user_id || loan.user?.id;
                        console.log(`Comparing loan.user.user_id (${loanUserId}) with userId (${userId})`);
                        return loanUserId == userId;
                  })
                : response.data;
            console.log('User ID:', userId);
            console.log('All loans:', response.data);
            console.log('Filtered loans:', userLoans);
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
                    <li key={loan.loan_id || loan.id}>
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