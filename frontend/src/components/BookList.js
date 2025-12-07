import React, { useState } from 'react';
import { deleteBook, updateBook } from '../services/books';
import { borrowBook } from '../services/loans'; // Import borrow service

// Receive 'onUpdate' (for refreshing) and 'allowDelete' (for admin check)
function BookList({ books = [], onUpdate, allowDelete = false }) {
    
    // Get current user to send their ID when borrowing
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [editingBook, setEditingBook] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [viewBookId, setViewBookId] = useState(null);

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

    const handleView = (bookId) => {
        setViewBookId(bookId);
    };

    const handleCloseView = () => {
        setViewBookId(null);
    };

    const handleEdit = (book) => {
        setEditingBook(book.book_id);
        setEditFormData({
            title: book.title,
            author_id: book.author?.author_id || '',
            genre: book.genre,
            publication_year: book.publication_year,
            status: book.status
        });
    };

    const handleSaveEdit = async (bookId) => {
        try {
            await updateBook(bookId, editFormData);
            alert('Book updated');
            setEditingBook(null);
            if (onUpdate) onUpdate();
        } catch (error) {
            alert('Error updating book');
            console.error(error);
        }
    };

    const handleCancelEdit = () => {
        setEditingBook(null);
        setEditFormData({});
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
        <div className="book-list card">
            <h2>Books</h2>
            <ul className="list book-list-items">
                {books.map(book => (
                    <li className="list-item" key={book.book_id || book.id}>
                        {editingBook === book.book_id ? (
                            <div>
                                <input 
                                    placeholder="Title" 
                                    value={editFormData.title} 
                                    onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                                    
                                /><br /><br />
                                <input 
                                    placeholder="Author ID" 
                                    value={editFormData.author_id} 
                                    onChange={(e) => setEditFormData({...editFormData, author_id: e.target.value})}
                                    
                                /><br /><br />
                                <input 
                                    placeholder="Genre" 
                                    value={editFormData.genre} 
                                    onChange={(e) => setEditFormData({...editFormData, genre: e.target.value})}
                                    
                                /><br /><br />
                                <input 
                                    placeholder="Publication Year" 
                                    value={editFormData.publication_year} 
                                    onChange={(e) => setEditFormData({...editFormData, publication_year: e.target.value})}
                                    
                                /><br /><br />
                                <select 
                                    value={editFormData.status} 
                                    onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                                    
                                >
                                    <option value="available">Available</option>
                                    <option value="on_loan">On Loan</option>
                                </select><br /><br />
                                <button onClick={() => handleSaveEdit(book.book_id)}>
                                    Save
                                </button>
                                <button onClick={handleCancelEdit}>
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="book-info">
                                    <div><strong>{book.title}</strong> <span className="muted">- {book.status}</span></div>
                                </div>
                                <div className="book-actions">
                                    {allowDelete && (
                                        <>
                                            <button className="btn-secondary" onClick={() => handleEdit(book)}>
                                                Edit
                                            </button>
                                            <button className="btn-danger" onClick={() => handleDelete(book.book_id)}>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                    {!allowDelete && (
                                        <>
                                            <button className="btn-ghost" onClick={() => handleView(book.book_id)}>
                                                View
                                            </button>
                                            {book.status === 'available' && (
                                                <button className="btn-primary" onClick={() => handleBorrow(book.book_id)}>
                                                    Borrow
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                                {viewBookId === book.book_id && (
                                    <div className="modal-overlay" onClick={handleCloseView}>
                                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                            <div className="modal-header">
                                                <h2>{book.title}</h2>
                                                <button className="modal-close" onClick={handleCloseView}>&times;</button>
                                            </div>
                                            <div>
                                                <div className="meta">Author: {book.author ? `${book.author.first_name} ${book.author.last_name}` : 'Unknown'}</div>
                                                <div className="meta">Genre: {book.genre || 'N/A'}</div>
                                                <div className="meta">Publication Year: {book.publication_year || 'N/A'}</div>
                                                <div className="meta">Status: {book.status || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>  
        </div>
    );
}
export default BookList;