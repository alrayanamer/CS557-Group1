import React, { useState, useEffect } from 'react';
import { getLoans, returnBook } from '../services/loans';

const LoanHistory = ({ userId }) => {
    const [loans, setLoans] = useState([]);

    const fetchLoans = async () => {
        try {
            const response = await getLoans(userId);
            const loansList = Array.isArray(response) ? response : (response.data || []);
            
            const sortedLoans = loansList.filter(loan => {
                const loanUserId = loan.user?.user_id || loan.user?.id;
                return userId ? loanUserId == userId : true;
            }).sort((a, b) => {
                const aActivity = a.return_date ? Date.parse(a.return_date) : Date.parse(a.borrow_date);
                const bActivity = b.return_date ? Date.parse(b.return_date) : Date.parse(b.borrow_date);
                return (bActivity || 0) - (aActivity || 0);
            });
            
            setLoans(sortedLoans);
        } catch (error) {
            console.error('Error fetching loans:', error);
            setLoans([]);
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
        <div className="loan-history card">
            <h2>Loan History</h2>
            <ul className="list loan-history-list">
                {Array.isArray(loans) && loans.map(loan => (
                    <li className="list-item" key={loan.loan_id || loan.id}>
                        <div>
                            <div><strong>{loan.book ? loan.book.title : 'Unknown'}</strong></div>
                            <div className="meta">Borrowed: {loan.borrow_date} • Returned: {loan.return_date || 'Not Returned'}</div>
                        </div>
                        <div className="book-actions">
                            {!loan.return_date && (
                                <button className="btn-primary" onClick={() => handleReturn(loan.loan_id)}>Return</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LoanHistory;