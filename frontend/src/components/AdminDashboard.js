import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import BookForm from './BookForm';
import LoanHistory from './LoanHistory';
import { getBooks } from '../services/books';

function AdminDashboard() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
            try {
                const response = await getBooks();
                setBooks(response.data);
            } catch (error) {
                alert('Error fetching books');
                console.error(error);
            }
        };
    useEffect(() => {fetchBooks(); }, []);
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <BookForm onBookAdded={fetchBooks} />
            <BookList books={books} onDelete={fetchBooks} />
            <LoanHistory />
        </div>  
    )
}
export default AdminDashboard;