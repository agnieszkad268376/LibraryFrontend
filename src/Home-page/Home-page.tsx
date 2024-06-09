import React, { useState } from "react";
import "./Home-page.css";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import mockLoans from "./mockLoans";
import mockBooks from "./mockBooks";
import { useApi } from "../api/ApiProvider";
import { useNavigate } from "react-router-dom";
import mockUsers from "./mockUsers";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("loans");
  const navigate = useNavigate();

  const apiClient = useApi();
  apiClient.getAllBooks().then((response) => {
    console.log(response);
  });

  const handleViewChange = (event: SelectChangeEvent<string>) => {
    setView(event.target.value);
  };

  const handleAddLoanClick = () => {
    navigate("/HomePage/featureLoan");
  };

  const handleRemoveLoanClick = () => {
    navigate("/HomePage/featureLoan");
  };

  const handleAddUserClick = () => {
    navigate("/HomePage/featureUser");
  };

  const handleRemoveUserClick = () => {
    navigate("/HomePage/featureUser");
  };

  const handleAddBookClick = () => {
    navigate("/HomePage/featureBook");
  };

  const handleRemoveBookClick = () => {
    navigate("/HomePage/featureBook");
  };

  const LoansList = () => (
    <div className="h-loans-list-container">
      <input
        type="text"
        placeholder="Search loans..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-search-bar"
      />
      <div className="h-loans-list">
        {mockLoans
          .filter((loan) =>
            `${loan.user} ${loan.bookTitle} ${loan.dueDate}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
          )
          .map((loan, index) => (
            <div className="h-loan-item" key={index}>
              <p>User: {loan.user}</p>
              <p>Book Title: {loan.bookTitle}</p>
              <p>Loan Date: {loan.loanDate}</p>
              <p>Due Date: {loan.dueDate}</p>
            </div>
          ))}
      </div>
    </div>
  );

  const BooksList = () => (
    <div className="h-books-list-container">
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-search-bar"
      />
      <div className="h-books-list">
        {mockBooks
          .filter((book) =>
            `${book.title} ${book.author} ${book.publisher}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
          )
          .map((book, index) => (
            <div className="h-book-item" key={index}>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Publisher: {book.publisher}</p>
              <p>Year: {book.year}</p>
              <p>Copies: {book.copies}</p>
            </div>
          ))}
      </div>
    </div>
  );

  const UsersList = () => (
    <div className="h-users-list-container">
      {mockUsers
        .filter((user) =>
          `${user.id} ${user.userName} ${user.role}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        )
        .map((user, index) => (
          <div className="h-book-item" key={index}>
            <p>id: {user.id}</p>
            <p>username: {user.userName}</p>
            <p>role: {user.role}</p>
          </div>
        ))}
    </div>
  );

  return (
    <div className="b-layout">
      <div className="h-top-bar">
        <p className="h-top-bar-text">Library</p>
      </div>
      <div className="h-rectangle-form">
        <div className="h-container">
          <div className="h-rectangle">
            <div className="h-hello-form">
              <h1 className="h-hello-text">Hello</h1>
              <h2 className="h-choose-text">What do you want to do?</h2>
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
                    Add loan
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleRemoveLoanClick}
                    sx={{
                      backgroundColor: "#6199c5",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#65589d",
                      },
                    }}
                  >
                    Remove loan
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
                    Add user
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleRemoveUserClick}
                    sx={{
                      backgroundColor: "#6199c5",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#65589d",
                      },
                    }}
                  >
                    Remove user
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
                    Add book
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleRemoveBookClick}
                    sx={{
                      backgroundColor: "#6199c5",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#65589d",
                      },
                    }}
                  >
                    Remove book
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
                <MenuItem value="Loans">Loans</MenuItem>
                <MenuItem value="Books">Books</MenuItem>
                <MenuItem value="Users">Users</MenuItem>
              </Select>
            </FormControl>
            {view === "Loans" && LoansList()}
            {view === "Books" && BooksList()}
            {view === "Users" && UsersList()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
