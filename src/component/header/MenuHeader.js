import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const MenuHeader = (props) => {
  return (
    <Link
      to={props.href}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <Button
        onClick={props.onClick}
        color="inherit"
        sx={{
          ":hover": {
            bgcolor: "black",
            color: "white",
          },
          width: "90px",
          color: "black",
        }}
      >
        {props.text}
      </Button>
    </Link>
  );
};
