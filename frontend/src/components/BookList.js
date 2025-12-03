import React from 'react';
import { deleteBook } from '../services/books';

function BookList({ books = [], onDelete, allowDelete = false }) {
    
    const handleDelete = async (bookId) => {
        try {
            await deleteBook(bookId);
            alert('Book deleted');
            if (onDelete) onDelete();
        } catch (error) {
            alert('Error deleting book');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Books</h2>
            <ul>
                {books.map(book => (
                    <li key={book.book_id || book.id}>
                        {book.title} - {book.status}
                        
                        {allowDelete && (
                            <button onClick={() => handleDelete(book.book_id)}>Delete</button>
                        )}
                    </li>
                ))}
            </ul>  
        </div>
    );
}
export default BookList;