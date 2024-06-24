import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./featureUser.css";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useApi } from "../api/ApiProvider";

interface User {
  id: number;
  userName: string;
  role: string;
}

function FeatureUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const { t } = useTranslation();
  const apiClient = useApi();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, [apiClient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      firstName,
      lastName,
      email,
      userRole,
    });
  };

  const UsersList = () => (
    <div className="u-users-list-container">
      {users
        .filter((user) =>
          `${user.id} ${user.userName} ${user.role}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        )
        .map((user, index) => (
          <div className="u-user-item" key={index}>
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
        <LanguageSwitcher />
        <p className="top-bar-text">{t("library")}</p>
      </div>
      <div className="u-rectangle-form">
        <div className="u-container">
          <div className="u-rectangle">
            <div className="u-hello-form">
              <h1 className="u-hello-text">Add user</h1>
            </div>
            <form onSubmit={handleSubmit} className="u-form">
              <div style={{ marginLeft: "20px" }}>
                <TextField
                  label="First Name"
                  value={firstName}
                  sx={{ width: "80%" }}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Last Name"
                  value={lastName}
                  sx={{ width: "80%" }}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  value={email}
                  sx={{ width: "80%" }}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>User Role</InputLabel>
                  <Select
                    value={userRole}
                    sx={{ width: "80%" }}
                    onChange={(e) => setUserRole(e.target.value)}
                  >
                    <MenuItem value="reader">Reader</MenuItem>
                    <MenuItem value="librarian">Librarian</MenuItem>
                  </Select>
                </FormControl>
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
          <div className="u-rectangle">
            <TextField
              label="Search"
              value={searchTerm}
              sx={{ width: "80%", margin: "20px" }}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              margin="normal"
            />
            <UsersList />
            {selectedUser && (
              <div className="u-delete-user-container">
                <p>
                  Are you sure you want to delete user: {selectedUser.userName}?
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
