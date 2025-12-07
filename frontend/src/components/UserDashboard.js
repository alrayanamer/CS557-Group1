import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import LoanHistory from './LoanHistory';
import { getBooks } from '../services/books';

function UserDashboard() {
    const [books, setBooks] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const currentUserData = localStorage.getItem('currentUser');
        if (currentUserData) {
            const user = JSON.parse(currentUserData);
            const id = user.user_id || user.id;
            setUserId(id);
            console.log('User ID from localStorage:', id);
        }
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await getBooks();
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="app-container">
            <div className="app-header"><div className="brand"><h1>User Dashboard</h1></div></div>
            <div className="dashboard-grid">
                <div>
                    <BookList books={books} onUpdate={fetchBooks} />
                </div>
                <div>
                    <div className="card">
                        <LoanHistory userId={userId} />
                    </div>
                </div>
            </div>
        </div>  
    )
}
export default UserDashboard;