import React from "react";
import { Typography, Container } from "@mui/material";

const NotFound = () => {
    return (
        <Container maxWidth="xs" sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                404 - Page Not Found
            </Typography>
            <Typography variant="body1">
                The page you are looking for does not exist.
            </Typography>
        </Container>
    );
};

export default NotFound;
