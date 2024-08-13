import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { handleAddAnswer } from "../../actions/allQuestions";

export const Poll = () => {

  const id = useParams().id;
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const allQuestions = useSelector((state) => state.allQuestions);
  const allUsers = useSelector((state) => state.allUsers);
  const question = Object.values(allQuestions).find(
    (question) => question.id === id
  );

  const navigate = useNavigate();
  if (!question) {
    return <Navigate to={`/NotFound`} />;
  }
  const author = Object.values(allUsers).find(
    (user) => user.id === question.author
  );

  const hasVotedForOptionOne = question.optionOne.votes.includes(authUser.id);
  const hasVotedForOptionTwo = question.optionTwo.votes.includes(authUser.id);
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const handleOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionOne"));
    navigate("/");
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionTwo"));
    navigate("/");
  };

  const calcPercentage = (option, question) => {
    const numberVotesTotal =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    switch (option) {
      case "optionOne":
        return (
          (question.optionOne.votes.length / numberVotesTotal) * 100 + " %"
        );
      case "optionTwo":
        return (
          (question.optionTwo.votes.length / numberVotesTotal) * 100 + " %"
        );
      default:
        return "";
    }
  };

  return (
    <div>
      <Typography
        variant="h5"
        component="h1"
        sx={{ fontWeight: "bold", mt: 3 }}
      >
        Poll by {author.id}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Avatar
          alt={author.id}
          src={author.avatarURL}
          sx={{ width: 56, height: 56 }}
        />
      </Box>

      <Typography
        variant="h6"
        component="h2"
        sx={{ textAlign: "center", fontWeight: "bold", mt: 4 }}
      >
        Would you rather?
      </Typography>

      <Grid container spacing={2} mt={4}>
        <Grid item xs={12}>
          <Button
            variant={hasVoted ? "contained" : "outlined"}
            disabled={hasVoted}
            onClick={handleOptionOne}
            sx={{
              width: "100%",
              bgcolor: hasVotedForOptionOne ? "lime" : "background.paper",
              color: hasVotedForOptionOne ? "white" : "text.primary",
              "&:hover": {
                boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
              {question.optionOne.text}
            </Typography>
            {!hasVoted && (
              <Typography
                variant="body2"
                component="span"
                underline="hover"
                sx={{ mb: 1 }}
              ></Typography>
            )}
            {hasVoted && (
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Votes: {question.optionOne.votes.length} (
                {calcPercentage("optionOne", question)})
              </Typography>
            )}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant={hasVoted ? "contained" : "outlined"}
            disabled={hasVoted}
            onClick={handleOptionTwo}
            sx={{
              width: "100%",
              bgcolor: hasVotedForOptionTwo ? "lime" : "background.paper",
              color: hasVotedForOptionTwo ? "white" : "text.primary",
              "&:hover": {
                boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
              {question.optionTwo.text}
            </Typography>
            {!hasVoted && (
              <Typography
                variant="body2"
                component="span"
                underline="hover"
                sx={{ mb: 1 }}
              ></Typography>
            )}
            {hasVoted && (
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Votes: {question.optionTwo.votes.length} (
                {calcPercentage("optionTwo", question)})
              </Typography>
            )}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
