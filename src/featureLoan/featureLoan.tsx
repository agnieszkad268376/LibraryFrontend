import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./featureLoan.css";
import { useNavigate } from "react-router-dom";
import mockLoans from "../Home-page/mockLoans";

interface Loan {
  user: string;
  bookTitle: string;
  loanDate: string;
  dueDate: string;
}

function FeatureUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [userLoan, setUserLoan] = useState("");
  const [bookLoan, setBookLoan] = useState("");
  const [terminDate, setTerminDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      userLoan,
      bookLoan,
      terminDate,
      dueDate,
    });
  };

  const handleLoanClick = (loan: Loan) => {
    setSelectedLoan(loan);
  };

  const handleDeleteLoan = () => {
    console.log("Deleting loan:", selectedLoan);
    setSelectedLoan(null);
  };

  const LoansList = () => (
    <div className="l-loans-list-container">
      {mockLoans
        .filter((loan) =>
          `${loan.user} ${loan.bookTitle} ${loan.loanDate} ${loan.dueDate}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        )
        .map((loan, index) => (
          <div
            className="l-loan-item"
            key={index}
            onClick={() => handleLoanClick(loan)}
          >
            <p>User: {loan.user}</p>
            <p>Book Title: {loan.bookTitle}</p>
            <p>Loan Date: {loan.loanDate}</p>
            <p>Due Date: {loan.dueDate}</p>
          </div>
        ))}
    </div>
  );

  return (
    <div className="l-layout">
      <div className="l-top-bar">
        <p className="l-top-bar-text">Library</p>
      </div>
      <div className="l-rectangle-form">
        <div className="l-container">
          <div className="l-rectangle">
            <div className="l-hello-form">
              <h1 className="l-hello-text">Add Loan</h1>
            </div>
            <form onSubmit={handleSubmit} className="l-form">
              <div style={{ marginLeft: "20px" }}>
                <TextField
                  label="User"
                  value={userLoan}
                  sx={{ width: "80%" }}
                  onChange={(e) => setUserLoan(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Book Title"
                  value={bookLoan}
                  sx={{ width: "80%" }}
                  onChange={(e) => setBookLoan(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Loan Date"
                  value={terminDate}
                  sx={{ width: "80%" }}
                  onChange={(e) => setTerminDate(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Due Date"
                  value={dueDate}
                  sx={{ width: "80%" }}
                  onChange={(e) => setDueDate(e.target.value)}
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
          <div className="l-rectangle">
            <TextField
              label="Search"
              value={searchTerm}
              sx={{ width: "80%", margin: "20px" }}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              margin="normal"
            />
            <LoansList />
            {selectedLoan && (
              <div className="l-delete-loan-container">
                <p>
                  Are you sure you want to delete this loan: {selectedLoan.user}
                  ?
                </p>
                <Button
                  onClick={handleDeleteLoan}
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
