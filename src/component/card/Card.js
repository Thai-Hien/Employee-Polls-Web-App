import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Card = ({ question, author }) => {
  const formattedDate = new Date(question.timestamp).toDateString();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        borderRadius: "1rem",
        boxShadow: 1,
        backgroundColor: "background.paper",
        maxWidth: "sm",
        margin: "auto",
        transition: "all .2s ease-in-out",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <Avatar
        alt={author?.id}
        src={author?.avatarURL}
        sx={{ width: 56, height: 56 }}
      />
      <Box sx={{ marginLeft: 1 }}>
        <Typography variant="h6" component="div">
          {author?.id}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          className="text-xs italic"
        >
          {formattedDate}
        </Typography>
        <Link to={`allQuestions/${question.id}`}>
          <Button variant="text">
            Show
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
