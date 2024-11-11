"use client";

import React, { useEffect, useState } from 'react';
import { bookGet, bookCreate, bookUpdate, bookDelete } from '../services/books';
import { Book, BookForm } from '../types/books';
import { AxiosError } from 'axios';
import Input from './Input'

const BooksCRUD = () => {
    const [title, settitle] = useState('');
    const [author, setauthor] = useState('');
    const [publicationYear, setpublicationYear] = useState('');
    const [booksList, setbooksList] = useState<Book[]>([]);
    const [editingbookId, setEditingbookId] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const data = await bookGet();
            setbooksList(data.data);
        } catch (error) {
            console.error("Failed to fetch books list:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        settitle('');
        setauthor('');
        setpublicationYear('');
        setEditingbookId(null);
    };

    const handleCreate = async () => {
        try {
            const newbook: BookForm = { title, author, publicationYear: parseInt(publicationYear) || 0 };
            await bookCreate(newbook);
            fetchData();
            resetForm();
        } catch (error) {
            handleError(error);
        }
    };

    const handleUpdate = async () => {
        if (!editingbookId) return;
        try {
            const updatebook: BookForm = { title, author, publicationYear: parseInt(publicationYear) || 0 };
            await bookUpdate(updatebook, editingbookId);
            fetchData();
            resetForm();
        } catch (error) {
            handleError(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await bookDelete(id);
            fetchData();
        } catch (error) {
            console.error("Failed to delete book:", error);
        }
    };

    const handleError = (error: unknown) => {
        if (error instanceof AxiosError) {
            alert(error.response?.data?.message || "Something went wrong!");
        } else {
            console.error(error);
        }
    };

    const startEdit = (book: Book) => {
        settitle(book.title);
        setauthor(book.author);
        setpublicationYear(book.publicationYear.toString());
        setEditingbookId(book._id);
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-50 shadow-lg rounded-lg mt-10">
            <div className="mb-5">
                <Input value={title} setValue={settitle} placholder={"title"}/>
                <Input value={author} setValue={setauthor} placholder={"Model"}/>
                <Input value={publicationYear} setValue={setpublicationYear} placholder={"publicationYear"}/>
                    
                <button
                    onClick={editingbookId ? handleUpdate : handleCreate}
                    className="w-full button bg-blue-500 hover:bg-blue-600"
                >
                    {editingbookId ? "Update" : "Create"}
                </button>
            </div>

            {booksList.length ? (
                booksList.map((book) => (
                    <div key={book._id} className="mb-4 p-4 bg-white rounded shadow-md">
                        <p className="mb-2 text-gray-700">
                            <span className="font-semibold">title:</span> {book.title}
                            <span className="font-semibold ml-4">Model:</span> {book.author}
                            <span className="font-semibold ml-4">publicationYear:</span> {book.publicationYear}
                        </p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => startEdit(book)}
                                className="button bg-yellow-500 hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(book._id)}
                                className="button bg-red-500 hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No books available</p>
            )}
        </div>
    );
};

export default BooksCRUD