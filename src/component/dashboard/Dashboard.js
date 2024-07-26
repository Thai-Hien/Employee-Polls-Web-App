import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { Card } from "../card/Card";

export const Dashboard = () => {
  const loggedInUser = useSelector((state) => state.authUser);
  const allQuestions = useSelector((state) => state.allQuestions);
  const allUsers = useSelector((state) => state.allUsers);

  const isUnisAnswered = (question) => {
    return !question.optionOne.votes?.includes(loggedInUser.id);
  };

  const isAnswered = (question) => {
    return (
      question.optionOne.votes?.includes(loggedInUser.id) ||
      question.optionTwo.votes?.includes(loggedInUser.id)
    );
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            New allQuestions
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Object.values(allQuestions)
              .filter((question) => question && isUnisAnswered(question))
              .map((question) => (
                <Grid item xs={2} sm={4} md={4} key={question.id}>
                  <Card
                    question={question}
                    author={allUsers[question.author]}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            isAnswered allQuestions
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Object.values(allQuestions)
              .filter((question) => question && isAnswered(question))
              .map((question) => (
                <Grid item xs={2} sm={4} md={4} key={question.id}>
                  <Card
                    question={question}
                    author={allUsers[question.author]}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
