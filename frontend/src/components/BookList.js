import React, { useState } from 'react';
import { deleteBook, updateBook } from '../services/books';
import { borrowBook } from '../services/loans'; // Import borrow service

// Receive 'onUpdate' (for refreshing) and 'allowDelete' (for admin check)
function BookList({ books = [], onUpdate, allowDelete = false }) {
    
    // Get current user to send their ID when borrowing
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [editingBook, setEditingBook] = useState(null);
    const [editFormData, setEditFormData] = useState({});

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
        <div>
            <h2>Books</h2>
            <ul>
                {books.map(book => (
                    <li key={book.book_id || book.id}>
                        {editingBook === book.book_id ? (
                            <div style={{marginBottom: '10px', padding: '10px', border: '1px solid #ccc'}}>
                                <input 
                                    placeholder="Title" 
                                    value={editFormData.title} 
                                    onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                                    style={{marginRight: '5px'}}
                                /><br /><br />
                                <input 
                                    placeholder="Author ID" 
                                    value={editFormData.author_id} 
                                    onChange={(e) => setEditFormData({...editFormData, author_id: e.target.value})}
                                    style={{marginRight: '5px'}}
                                /><br /><br />
                                <input 
                                    placeholder="Genre" 
                                    value={editFormData.genre} 
                                    onChange={(e) => setEditFormData({...editFormData, genre: e.target.value})}
                                    style={{marginRight: '5px'}}
                                /><br /><br />
                                <input 
                                    placeholder="Publication Year" 
                                    value={editFormData.publication_year} 
                                    onChange={(e) => setEditFormData({...editFormData, publication_year: e.target.value})}
                                    style={{marginRight: '5px'}}
                                /><br /><br />
                                <select 
                                    value={editFormData.status} 
                                    onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                                    style={{marginRight: '5px'}}
                                >
                                    <option value="available">Available</option>
                                    <option value="on_loan">On Loan</option>
                                </select><br /><br />
                                <button onClick={() => handleSaveEdit(book.book_id)} style={{marginRight: '5px', color: 'green'}}>
                                    Save
                                </button>
                                <button onClick={handleCancelEdit} style={{color: 'gray'}}>
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div>
                                {book.title} - <strong>{book.status}</strong>
                                
                                {allowDelete && (
                                    <>
                                        <button onClick={() => handleEdit(book)} style={{marginLeft: '10px', color: 'blue'}}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(book.book_id)} style={{marginLeft: '5px', color: 'red'}}>
                                            Delete
                                        </button>
                                    </>
                                )}
                                {!allowDelete && book.status === 'available' && (
                                    <button onClick={() => handleBorrow(book.book_id)} style={{marginLeft: '10px', color: 'green'}}>
                                        Borrow
                                    </button>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>  
        </div>
    );
}
export default BookList;