import React from 'react';
import { deleteBook } from '../services/books';
import { borrowBook } from '../services/loans'; // Import borrow service

// Receive 'onUpdate' (for refreshing) and 'allowDelete' (for admin check)
function BookList({ books = [], onUpdate, allowDelete = false }) {
    
    // Get current user to send their ID when borrowing
    const user = JSON.parse(localStorage.getItem('currentUser'));

    const handleDelete = async (bookId) => {
        try {
            await deleteBook(bookId);
            alert('Book deleted');
            if (onUpdate) onUpdate();
        } catch (error) {
            alert('Error deleting book');
            console.error(error);
        }
    };

    const handleBorrow = async (bookId) => {
        if (!user) {
            alert('Please log in to borrow books');
            return;
        }
        try {
            // Send user_id and book_id to the backend
            await borrowBook({
                user_id: user.user_id, 
                book_id: bookId
            });
            alert('Book borrowed successfully!');
            // Refresh the list to show the new status
            if (onUpdate) onUpdate();
        } catch (error) {
            alert('Error borrowing book');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Books</h2>
            <ul>
                {books.map(book => (
                    <li key={book.book_id || book.id}>
                        {book.title} - <strong>{book.status}</strong>
                        
                        {allowDelete && (
                            <button onClick={() => handleDelete(book.book_id)} style={{marginLeft: '10px', color: 'red'}}>
                                Delete
                            </button>
                        )}
                        {!allowDelete && book.status === 'available' && (
                            <button onClick={() => handleBorrow(book.book_id)} style={{marginLeft: '10px', color: 'green'}}>
                                Borrow
                            </button>
                        )}
                    </li>
                ))}
            </ul>  
        </div>
    );
}
export default BookList;