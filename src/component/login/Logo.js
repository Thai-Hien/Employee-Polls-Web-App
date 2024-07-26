import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import logo from './logo.png';

const LogoContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});

const LogoImage = styled('div')({
  backgroundImage: `url(${logo})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '200px',
  height: '200px',
  marginTop: '20px',
});


export const Logo = () => (
  <LogoContainer>
    <Typography variant="h3">Employee Polls</Typography>
    <LogoImage />
  </LogoContainer>
);
