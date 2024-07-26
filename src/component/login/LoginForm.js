import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../actions/authUser";

export const LoginForm = () => {
  const [selectedUser, setSelectedUser] = useState("sarahedo");
  const [password, setPassword] = useState("pass1");
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.allUsers);

  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(handleLogin(selectedUser, password));
    setSelectedUser("");
    setPassword("");
  };

  const onUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "50px",
        padding: "20px"
      }}
    >
      <Typography variant="h3" gutterBottom>
        Login
      </Typography>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
        onSubmit={onFormSubmit}
      >
        <div>
          <Typography variant="subtitle1">Select User:</Typography>
          <Select
            value={selectedUser}
            onChange={onUserChange}
            sx={{ width: 300 }}
            required
          >
            {Object.keys(userList).map((key) => (
              <MenuItem key={userList[key].id} value={userList[key].id}>
                {userList[key].name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          sx={{ width: 300 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Log In
        </Button>
      </form>
    </div>
  );
};
