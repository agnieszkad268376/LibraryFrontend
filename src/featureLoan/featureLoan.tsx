import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import "./featureLoan.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";
import { useApi } from "../api/ApiProvider";

interface Loan {
  userId: { id: number; userName: string; email: string };
  bookId: { id: number; title: string; author: string };
  loanDate: string;
  terminDate: string;
}

function FeatureLoan() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [userLoan, setUserLoan] = useState("");
  const [bookLoan, setBookLoan] = useState("");
  const [terminDate, setTerminDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);
  const { t } = useTranslation();
  const apiClient = useApi();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await apiClient.getAllLoans();
        setLoans(response.data);
      } catch (error) {
        console.error("Error fetching loans", error);
      }
    };

    fetchLoans();
  }, [apiClient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      userLoan,
      bookLoan,
      terminDate,
      dueDate,
    });
  };

  const LoansList = () => (
    <div className="l-loans-list-container">
      {loans
        .filter((loan) =>
          `${loan.userId} ${loan.bookId} ${loan.loanDate} ${loan.terminDate}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        )
        .map((loan, index) => (
          <div className="l-loan-item" key={index}>
            <p>
              {t("user")}: {loan.userId.userName}
            </p>
            <p>
              {t("title")}: {loan.bookId.title}
            </p>
            <p>
              {t("loanDate")}: {loan.loanDate}
            </p>
            <p>
              {t("terminDate")}: {loan.terminDate}
            </p>
          </div>
        ))}
    </div>
  );

  return (
    <div className="l-layout">
      <div className="h-top-bar">
        <LanguageSwitcher />
        <p className="top-bar-text">{t("library")}</p>
      </div>
      <div className="l-rectangle-form">
        <div className="l-container">
          <div className="l-rectangle">
            <div className="l-hello-form">
              <h1 className="l-hello-text">{t("addLoan")}</h1>
            </div>
            <form onSubmit={handleSubmit} className="l-form">
              <div style={{ marginLeft: "20px" }}>
                <TextField
                  label={t("user")}
                  value={userLoan}
                  sx={{ width: "80%" }}
                  onChange={(e) => setUserLoan(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label={t("title")}
                  value={bookLoan}
                  sx={{ width: "80%" }}
                  onChange={(e) => setBookLoan(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label={t("loanDate")}
                  value={terminDate}
                  sx={{ width: "80%" }}
                  onChange={(e) => setTerminDate(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label={t("terminDate")}
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
                  {t("submit")}
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
            {selectedLoan && <div className="l-delete-loan-container"></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureLoan;
