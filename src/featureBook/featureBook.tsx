import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./featureBook.css";
import { useNavigate } from "react-router-dom";
import mockLoans from "../Home-page/mockLoans";
import mockBooks from "../Home-page/mockBooks";

interface Book {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  year: number;
  copies: number;
}

function FeatureUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [copies, setCopies] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      title,
      author,
      isbn,
      publisher,
      year,
      copies,
    });
  };

  const handleLoanClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleDeleteBook = () => {
    console.log("Deleting book:", selectedBook);
    setSelectedBook(null);
  };

  const BookList = () => (
    <div className="b-loans-list-container">
      {mockBooks
        .filter((book) =>
          `${book.title} ${book.author} ${book.isbn} ${book.publisher} ${book.year} ${book.copies}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        )
        .map((book, index) => (
          <div
            className="b-loan-item"
            key={index}
            onClick={() => handleLoanClick(book)}
          >
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Publisher: {book.publisher}</p>
            <p>Year: {book.year}</p>
            <p>Coopies: {book.copies}</p>
          </div>
        ))}
    </div>
  );

  return (
    <div className="b-layout">
      <div className="b-top-bar">
        <p className="b-top-bar-text">Library</p>
      </div>
      <div className="b-rectangle-form">
        <div className="b-container">
          <div className="b-rectangle">
            <div className="b-hello-form">
              <p className="b-hello-text">Add Book</p>
            </div>
            <form onSubmit={handleSubmit} className="b-form">
              <div style={{ marginLeft: "20px" }}>
                <TextField
                  label="Title"
                  value={title}
                  sx={{ width: "80%" }}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Author"
                  value={author}
                  sx={{ width: "80%" }}
                  onChange={(e) => setAuthor(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="ISBN"
                  value={isbn}
                  sx={{ width: "80%" }}
                  onChange={(e) => setIsbn(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Publisher"
                  value={publisher}
                  sx={{ width: "80%" }}
                  onChange={(e) => setPublisher(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Year"
                  value={year}
                  sx={{ width: "80%" }}
                  onChange={(e) => setYear(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Copies"
                  value={copies}
                  sx={{ width: "80%" }}
                  onChange={(e) => setCopies(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  className="submit-button"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
          <div className="b-rectangle">
            <TextField
              label="Search"
              value={searchTerm}
              sx={{ width: "80%", margin: "20px" }}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              margin="normal"
            />
            <BookList />
            {selectedBook && (
              <div className="b-delete-loan-container">
                <p>
                  Are you sure you want to delete this book:{" "}
                  {selectedBook.title}?
                </p>
                <Button
                  onClick={handleDeleteBook}
                  variant="contained"
                  color="secondary"
                >
                  DELETE
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureUser;
