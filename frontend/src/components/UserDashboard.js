import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import LoanHistory from './LoanHistory';
import { getBooks } from '../services/books';

function UserDashboard() {
    const [books, setBooks] = useState([]);
    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books', error);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div>
            <h1>User Dashboard</h1>
            <BookList books={books} />
            <LoanHistory userId={user ? user.user_id : null} />
        </div>  
    )
}
export default UserDashboard;