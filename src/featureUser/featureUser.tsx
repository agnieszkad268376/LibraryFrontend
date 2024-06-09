import React, { useState } from "react";
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
import mockUsers from "../Home-page/mockUsers";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      firstName,
      lastName,
      email,
      userRole,
    });
    navigate("/doctor/mypatients");
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = () => {
    console.log("Usuwanie użytkownika:", selectedUser);
    setSelectedUser(null);
  };

  const UsersList = () => (
    <div className="u-users-list-container">
      {mockUsers
        .filter((user) =>
          `${user.id} ${user.userName} ${user.role}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        )
        .map((user, index) => (
          <div
            className="h-book-item"
            key={index}
            onClick={() => handleUserClick(user)}
          >
            <p>id: {user.id}</p>
            <p>username: {user.userName}</p>
            <p>role: {user.role}</p>
          </div>
        ))}
    </div>
  );

  return (
    <div className="b-layout">
      <div className="u-top-bar">
        <p className="u-top-bar-text">Library</p>
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
                <Button
                  onClick={handleDeleteUser}
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
