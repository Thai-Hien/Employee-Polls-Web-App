import {
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../../actions/allQuestions";
import { useDispatch } from "react-redux";

export const NewPoll = () => {
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState("");
  const dispatch = useDispatch();
  const [secondOption, setSecondOption] = useState("");

  const handleFirstOptionChange = (e) => {
    const value = e.target.value;
    setFirstOption(value);
  };

  const handleSecondOptionChange = (e) => {
    const value = e.target.value;
    setSecondOption(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(firstOption, secondOption));
    navigate("/");
  };

  return (
    <div>
      <Typography
        variant="h5"
        component="h1"
        sx={{ fontWeight: "bold", mt: 3 }}
      >
        New Poll
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl sx={{ mt: 3 }}>
          <Typography variant="body1" component="label" htmlFor="firstOption">
            First Option
          </Typography>
          <TextField
            id="firstOption"
            label="First Option"
            value={firstOption}
            onChange={handleFirstOptionChange}
            fullWidth
            data-testid="firstOption"
          />
          <FormHelperText sx={{ color: "text.secondary" }}>
            This option will be displayed to allUsers.
          </FormHelperText>
        </FormControl>

        <FormControl sx={{ mt: 3 }}>
          <Typography variant="body1" component="label" htmlFor="secondOption">
            Second Option
          </Typography>
          <TextField
            id="secondOption"
            label="Second Option"
            value={secondOption}
            onChange={handleSecondOptionChange}
            fullWidth
            data-testid="secondOption"
          />
          <FormHelperText sx={{ color: "text.secondary" }}>
            This option will be displayed to allUsers.
          </FormHelperText>
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          color="primary"
          sx={{ mt: 6, float: "right" }}
          data-testid="submit-poll"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
