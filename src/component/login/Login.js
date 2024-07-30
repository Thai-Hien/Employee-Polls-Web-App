import React from "react";
import { Logo } from "./Logo";
import { LoginForm } from "./LoginForm";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Box, Container } from "@mui/material";

export const Login = () => {
  const isAuthenticated = useSelector((state) => !!state.authUser);

  if (isAuthenticated) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    return <Navigate to={redirectUrl || "/"} />;
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 3
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Logo />
      </Box>
      <Box sx={{ width: "100%" }}>
        <LoginForm />
      </Box>
    </Container>
  );
};
