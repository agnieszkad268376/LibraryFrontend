import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import "./featureBook.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";
import { useApi } from "../api/ApiProvider";

interface Book {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publishYear: number;
  availableCopies: number;
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
  const [books, setBooks] = useState<Book[]>([]);
  const { t } = useTranslation();
  const apiClient = useApi();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await apiClient.getAllBooks();
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };

    fetchBooks();
  }, [apiClient]);

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

  const BookList = () => (
    <div className="b-loans-list-container">
      {books
        .filter((book) =>
          `${book.title} ${book.author} ${book.isbn} ${book.publisher} ${book.publishYear} ${book.availableCopies}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        )
        .map((book, index) => (
          <div
            className="b-loan-item"
            key={index}
            onClick={() => handleLoanClick(book)}
          >
            <p>
              {t("title")}: {book.title}
            </p>
            <p>
              {t("author")}: {book.author}
            </p>
            <p>ISBN: {book.isbn}</p>
            <p>
              {t("publisher")}: {book.publisher}
            </p>
            <p>
              {t("year")}: {book.publishYear}
            </p>
            <p>
              {t("copies")}: {book.availableCopies}
            </p>
          </div>
        ))}
    </div>
  );

  return (
    <div className="b-layout">
      <div className="h-top-bar">
        <LanguageSwitcher />
        <p className="top-bar-text">{t("library")}</p>
      </div>
      <div className="b-rectangle-form">
        <div className="b-container">
          <div className="b-rectangle">
            <div className="b-hello-form">
              <p className="b-hello-text">{t("addBook")}</p>
            </div>
            <form onSubmit={handleSubmit} className="b-form">
              <div style={{ marginLeft: "20px" }}>
                <TextField
                  label={t("title")}
                  value={title}
                  sx={{ width: "80%" }}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label={t("author")}
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
                  label={t("publisher")}
                  value={publisher}
                  sx={{ width: "80%" }}
                  onChange={(e) => setPublisher(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label={t("year")}
                  value={year}
                  sx={{ width: "80%" }}
                  onChange={(e) => setYear(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label={t("copies")}
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
                  {t("year")}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureUser;
