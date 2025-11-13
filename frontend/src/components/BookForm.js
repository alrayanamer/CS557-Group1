import React, { useState } from 'react';
import { addBook } from '../services/books';

function BookForm({ onBookAdded }) {
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [genre, setGenre] = useState('');
    const [publicationYear, setPublicationYear] = useState('');

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await addBook({
                title,
                author_id: authorId,
                genre,
                publication_year: publicationYear,
                status: 'available',
            })
            alert("Book added");
            setTitle('');
            setAuthorId('');
            setGenre('');
            setPublicationYear('');
            if (onBookAdded) onBookAdded();
        } catch (error) {
            alert('Error adding book');
            console.error(error);
        }
    };
    return (
        <div>
           <h2>Add New Book</h2>
            <form onSubmit={handleAdd}>
              <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required /><br /><br />
              <input placeholder="Author ID" value={authorId} onChange={e => setAuthorId(e.target.value)} required /><br /><br />
              <input placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} /><br /><br />
              <input placeholder="Publication Year" value={publicationYear} onChange={e => setPublicationYear(e.target.value)} /><br /><br />
              <button type="submit">Add Book</button>
            </form>
        </div>
    );
}
export default BookForm;