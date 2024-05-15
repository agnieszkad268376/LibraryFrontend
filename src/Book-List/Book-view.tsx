import React, { useState } from "react";
import mockBooks from "./mockBooks";
import "./Book-view.css";

function BooksView() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="b-layout">
      <div className="top-bar">
        <p className="top-bar-text">Library</p>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="book-list-container">
        <div className="book-list">
          {mockBooks
            .filter((book) =>
              `${book.title} ${book.author} ${book.genre} ${book.publisher}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
            )
            .map((book, index) => (
              <div className="book-item" key={index}>
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Publisher: {book.publisher}</p>
                <p>Year: {book.year}</p>
                <p>Copies: {book.copies}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default BooksView;
