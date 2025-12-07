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
        <div className="app-container">
            <div className="app-header">
                <div className="brand"><h1>Admin Dashboard</h1><div className="tag muted">Administrator</div></div>
            </div>
            <div className="dashboard-grid">
                <div>
                    <BookForm onBookAdded={fetchBooks} />
                    <BookList books={books} onUpdate={fetchBooks} allowDelete={true} />
                </div>
                <div>
                    <div className="card">
                        <LoanHistory />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminDashboard;