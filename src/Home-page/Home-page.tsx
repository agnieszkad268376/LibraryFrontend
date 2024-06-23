import React, { useState, useEffect } from "react";
import "./Home-page.css";
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
import { ReturnLoanDto } from "../api/dto/returnLoanDto";

// Define interfaces for the data types
interface Loan {
  loanId: number;
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

interface User {
  id: number;
  userName: string;
  role: string;
}

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("loans");
  const [loans, setLoans] = useState<Loan[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const apiClient = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loansResponse = await apiClient.getAllLoans();
        setLoans(loansResponse.data);

        const booksResponse = await apiClient.getAllBooks();
        setBooks(booksResponse.data);

        const usersResponse = await apiClient.getAllUsers();
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [apiClient]);

  const handleViewChange = (event: SelectChangeEvent<string>) => {
    setView(event.target.value);
  };

  const handleAddLoanClick = () => {
    navigate("/HomePage/featureLoan");
  };

  const handleAddUserClick = () => {
    navigate("/HomePage/featureUser");
  };

  const handleAddBookClick = () => {
    navigate("/HomePage/featureBook");
  };

  const handleRemoveUserClick = (userId: number) => {
    apiClient
      .deleteUser(userId)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user", error);
      });
  };

  const handleRemoveBookClick = (bookId: number) => {
    apiClient
      .deleteBook(bookId)
      .then(() => {
        setBooks(books.filter((book) => book.bookId !== bookId));
      })
      .catch((error) => {
        console.error("Error deleting book", error);
      });
  };

  const handleReturnLoanClick = (loanId: number) => {
    if (!loanId) {
      console.error("Loan ID is invalid or missing");
      return;
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    const returnLoanData: ReturnLoanDto = {
      loanId: loanId.toString(),
      returnDate: formattedDate,
    };

    console.log(
      "Sending request to /loan/returnLoan with payload:",
      returnLoanData,
    );

    apiClient
      .returnLoan(returnLoanData)
      .then(() => {
        setLoans(
          loans.map((loan) => {
            if (loan.loanId === loanId) {
              return { ...loan, returnDate: formattedDate };
            }
            return loan;
          }),
        );
      })
      .catch((error) => {
        console.error("Error returning loan", error);
      });
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
        {loans
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
              {!loan.returnDate && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleReturnLoanClick(loan.loanId)}
                  sx={{
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#388e3c",
                    },
                  }}
                >
                  Return
                </Button>
              )}
            </div>
          ))}
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
              <Button
                variant="contained"
                size="small"
                onClick={() => handleRemoveBookClick(book.bookId)}
                sx={{
                  backgroundColor: "#d32f2f",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#b71c1c",
                  },
                }}
              >
                Remove
              </Button>
            </div>
          ))}
      </div>
    </div>
  );

  const UsersList = () => (
    <div className="h-users-list-container">
      <input
        type="text"
        placeholder={t("searchUsers")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-search-bar"
      />
      <div className="h-users-list">
        {users
          .filter((user) =>
            `${user.id} ${user.userName} ${user.role}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
          )
          .map((user, index) => (
            <div className="h-users-item" key={index}>
              <p>id: {user.id}</p>
              <p>
                {t("username")}: {user.userName}
              </p>
              <p>
                {t("role")}: {user.role}
              </p>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleRemoveUserClick(user.id)}
                sx={{
                  backgroundColor: "#d32f2f",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#b71c1c",
                  },
                }}
              >
                Remove
              </Button>
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
              <h1 className="h-hello-text">{t("hpText1")}</h1>
              <h2 className="h-choose-text">{t("hpText2")}</h2>
            </div>
            <div>
              <div className="h-action-buttons">
                <div className="h-two-buttons">
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleAddLoanClick}
                    sx={{
                      backgroundColor: "#6199c5",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#65589d",
                      },
                    }}
                  >
                    {t("addLoan")}
                  </Button>
                </div>
                <div className="h-two-buttons">
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleAddUserClick}
                    sx={{
                      backgroundColor: "#6199c5",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#65589d",
                      },
                    }}
                  >
                    {t("addUser")}
                  </Button>
                </div>
                <div className="h-two-buttons">
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleAddBookClick}
                    sx={{
                      backgroundColor: "#6199c5",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#65589d",
                      },
                    }}
                  >
                    {t("addBook")}
                  </Button>
                </div>
              </div>
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
                <MenuItem value="Users">{t("users")}</MenuItem>
              </Select>
            </FormControl>
            {view === "Loans" && <LoansList />}
            {view === "Books" && <BooksList />}
            {view === "Users" && <UsersList />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
