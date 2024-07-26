import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Avatar,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const allUsers = useSelector((state) => state.allUsers);

  const rows = Object.values(allUsers).map((user) => ({
    id: user.id,
    name: user.name,
    avatar: user.avatarURL,
    isAnswered: Object.keys(user.answers || {}).length,
    created: (user.allQuestions || []).length,
  }));

  return (
    <Box sx={{ mt: 4, mx: "auto", maxWidth: 800 }}>
      <Typography variant="h3" component="h1" data-testid="heading" gutterBottom align="center">
        Leaderboard
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>User</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>isAnswered</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell align="center" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Avatar alt={row.name} src={row.avatar} sx={{ mr: 2 }} />
                  <Typography>{row.name}</Typography>
                </TableCell>
                <TableCell align="center">{row.isAnswered}</TableCell>
                <TableCell align="center">{row.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Leaderboard;
