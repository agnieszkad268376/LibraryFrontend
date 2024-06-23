import React, { useState, useEffect } from "react";
import "./UserHome.css";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useApi } from "../api/ApiProvider";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

// Define interfaces for the data types
interface Loan {
  id: number;
  userId: { id: number; userName: string; email: string };
  bookId: { id: number; title: string; author: string };
  loanDate: string;
  terminDate: string;
  returnDate: string;
}

interface Book {
  bookId: number;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publishYear: number;
  availableCopies: number;
}

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("loans");
  const [loans, setLoans] = useState<Loan[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null); // State to hold the logged in user's ID
  const navigate = useNavigate();
  const { t } = useTranslation();
  const apiClient = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meResponse = await apiClient.getMe();
        if (meResponse.success) {
          const userId = meResponse.data.id;
          setLoggedInUserId(userId);

          const loansResponse = await apiClient.getMyLoans(userId);
          setLoans(loansResponse.data);

          const booksResponse = await apiClient.getAllBooks();
          setBooks(booksResponse.data);
        } else {
          console.error("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [apiClient]);

  const handleViewChange = (event: SelectChangeEvent<string>) => {
    setView(event.target.value);
  };

  const LoansList = () => (
    <div className="h-loans-list-container">
      <input
        type="text"
        placeholder={t("searchLoans")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-search-bar"
      />
      <div className="h-loans-list">
        {loans && loans.length > 0 ? (
          loans
            .filter((loan) =>
              `${loan.userId.userName} ${loan.bookId.title} ${loan.loanDate} ${loan.terminDate} ${loan.returnDate}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
            )
            .map((loan, index) => (
              <div className="h-loan-item" key={index}>
                <p>
                  {t("users")}: {loan.userId.userName}
                </p>
                <p>
                  {t("bookTitle")}: {loan.bookId.title}
                </p>
                <p>
                  {t("loanDate")}: {loan.loanDate}
                </p>
                <p>
                  {t("terminDate")}: {loan.terminDate}
                </p>
                <p>
                  {t("returnDate")}: {loan.returnDate}
                </p>
              </div>
            ))
        ) : (
          <p>No loans available</p>
        )}
      </div>
    </div>
  );

  const BooksList = () => (
    <div className="h-books-list-container">
      <input
        type="text"
        placeholder={t("searchBooks")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-search-bar"
      />
      <div className="h-books-list">
        {books
          .filter((book) =>
            `${book.title} ${book.author} ${book.publisher}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
          )
          .map((book, index) => (
            <div className="h-book-item" key={index}>
              <h2>{book.title}</h2>
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
    </div>
  );

  return (
    <div className="b-layout">
      <div className="h-top-bar">
        <LanguageSwitcher />
        <p className="top-bar-text">{t("library")}</p>
      </div>
      <div className="h-rectangle-form">
        <div className="h-container">
          <div className="h-rectangle">
            <div className="h-hello-form">
              <h1 className="h-hello-text">{t("helloUser")}</h1>
              <h2 className="h-choose-text">{t("userTask1")}</h2>
              <h2 className="h-choose-text">{t("userTask2")}</h2>
            </div>
          </div>

          <div className="h-rectangle">
            <FormControl
              sx={{
                marginBottom: 2,
                width: "50%",
                marginTop: "20px",
                marginLeft: "10px",
              }}
            >
              <InputLabel id="view-select">Select List</InputLabel>
              <Select
                value={view}
                onChange={handleViewChange}
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  width: "610px",
                  marginTop: "10px",
                  marginLeft: "10px",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(168,168,168,0.38)",
                  },
                }}
              >
                <MenuItem value="Loans">{t("loans")}</MenuItem>
                <MenuItem value="Books">{t("books")}</MenuItem>
              </Select>
            </FormControl>
            {view === "Loans" && <LoansList />}
            {view === "Books" && <BooksList />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
