import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, Divider, Tabs, Tab, Box } from '@mui/material';
import { Card } from '../card/Card';

export const Dashboard = () => {
  const loggedInUser = useSelector((state) => state.authUser);
  const allQuestions = useSelector((state) => state.allQuestions);
  const allUsers = useSelector((state) => state.allUsers);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const isUnAnswered = (question) => {
    return !question.optionOne.votes?.includes(loggedInUser.id) &&
      !question.optionTwo.votes?.includes(loggedInUser.id);
  };

  const isAnswered = (question) => {
    return (
      question.optionOne.votes?.includes(loggedInUser.id) ||
      question.optionTwo.votes?.includes(loggedInUser.id)
    );
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3" component="h3">
          Welcome, {loggedInUser.name}
        </Typography>
      </Box>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="poll tabs"
        sx={{ mb: 3 }}
      >
        <Tab label="Unanswered Polls" />
        <Tab label="Answered Polls" />
      </Tabs>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            {tabIndex === 0 ? 'Unanswered Polls' : 'Answered Polls'}
          </Typography>
          <Divider sx={{ my: 3, borderBottomWidth: 3, borderColor: 'primary.main' }} />
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Object.values(allQuestions)
              .filter((question) =>
                tabIndex === 0 ? isUnAnswered(question) : isAnswered(question)
              )
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
