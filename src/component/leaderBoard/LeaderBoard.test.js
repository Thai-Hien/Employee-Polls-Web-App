import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Leaderboard from "./LeaderBoard";
import { act } from "react";
import { saveQuestion, saveQuestionAnswer } from "../../service/api";
import { _saveQuestion, _saveQuestionAnswer } from "../../utils/Data";
import ButtonComponent from './buttonTest';

describe('ButtonComponent Tests', () => {
  it('should change text when button is clicked', () => {
    const { getByText } = render(<ButtonComponent />);

    expect(getByText('Initial Text')).toBeInTheDocument();

    fireEvent.click(getByText('Click me'));

    expect(getByText('Text After Click')).toBeInTheDocument();
  });
});

jest.mock("../../utils/Data", () => ({
  _saveQuestion: jest.fn(),
  _saveQuestionAnswer: jest.fn(),
}));

describe('Function Tests', () => {
  describe('saveQuestion', () => {
    it('should call _saveQuestion with correct arguments', () => {
      const optionOneText = 'Option One';
      const optionTwoText = 'Option Two';
      const author = 'Author';

      saveQuestion(optionOneText, optionTwoText, author);

      expect(_saveQuestion).toHaveBeenCalledWith({
        optionOneText,
        optionTwoText,
        author,
      });
    });
  });

  describe('saveQuestionAnswer', () => {
    it('should call _saveQuestionAnswer with correct arguments', () => {
      const authedUserId = 'user1';
      const qid = 'question1';
      const answer = 'optionOne';

      saveQuestionAnswer(authedUserId, qid, answer);

      expect(_saveQuestionAnswer).toHaveBeenCalledWith({
        authedUser: authedUserId,
        qid,
        answer,
      });
    });
  });
});


const createMockStore = configureStore([]);

describe("Leaderboard Component Tests", () => {
  let store;

  beforeEach(() => {
    store = createMockStore({
      allUsers: {
        1: {
          id: 1,
          name: "User Alpha",
          answers: { a1: "Answer A1" },
          allQuestions: ["q1", "q2"],
        },
        2: {
          id: 2,
          name: "User Beta",
          answers: { a1: "Answer A1", a2: "Answer A2" },
          allQuestions: ["q1"],
        },
      },
    });
  });

  test("should handle cases where user data fields are undefined without errors", () => {
    store = createMockStore({
      allUsers: {
        1: {
          id: 1,
          name: "User Alpha",
          answers: undefined,
          allQuestions: undefined,
        },
      },
    });
    let getByText;
    let getAllByText;
    act(() => {
      const renderResult = render(
        <Provider store={store}>
          <Leaderboard />
        </Provider>
      );
      getByText = renderResult.getByText;
      getAllByText = renderResult.getAllByText;
    });
    expect(getByText("User Alpha")).toBeInTheDocument();
    const zeroElements = getAllByText("0");
    expect(zeroElements).toHaveLength(2);
  });

  test("should display correct values in the 'isAnswered' and 'Created' columns based on user data", () => {
    let getAllByRole;

    act(() => {
      const renderResult = render(
        <Provider store={store}>
          <Leaderboard />
        </Provider>
      );
      getAllByRole = renderResult.getAllByRole;
    });

    const rows = getAllByRole("row");
    const isAnsweredValues = Array.from(rows).slice(1).map(row => row.cells[1].textContent); // Extract 'isAnswered' column values
    const createdValues = Array.from(rows).slice(1).map(row => row.cells[2].textContent); // Extract 'Created' column values

    // Expected values for 'isAnswered' and 'Created' columns
    const expectedIsAnsweredValues = ["1", "2"];
    const expectedCreatedValues = ["2", "1"];

    expect(isAnsweredValues).toEqual(expectedIsAnsweredValues);
    expect(createdValues).toEqual(expectedCreatedValues);
  });

  test("should correctly display table headers for user leaderboard", () => {
    let getByText;
    act(() => {
      const renderResult = render(
        <Provider store={store}>
          <Leaderboard />
        </Provider>
      );
      getByText = renderResult.getByText;
    });
    expect(getByText("User")).toBeInTheDocument();
    expect(getByText("isAnswered")).toBeInTheDocument();
    expect(getByText("Created")).toBeInTheDocument();
  });

  test("should match the rendered leaderboard component with the stored snapshot", () => {
    let asFragment;
    act(() => {
      const renderResult = render(
        <Provider store={store}>
          <Leaderboard />
        </Provider>
      );
      asFragment = renderResult.asFragment;
    });
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render the leaderboard title with the text 'Leaderboard'", () => {
    let getByTestId;
    act(() => {
      const renderResult = render(
        <Provider store={store}>
          <Leaderboard />
        </Provider>
      );
      getByTestId = renderResult.getByTestId;
    });
    expect(getByTestId("heading")).toHaveTextContent("Leaderboard");
  });

  test("should correctly render the number of users displayed in the leaderboard", () => {
    let getAllByRole;
    act(() => {
      const renderResult = render(
        <Provider store={store}>
          <Leaderboard />
        </Provider>
      );
      getAllByRole = renderResult.getAllByRole;
    });
    expect(getAllByRole("row")).toHaveLength(3); // 2 users + 1 header row
  });

  test("should render the correct number of data cells in the table for users", () => {
    let getAllByRole;
    act(() => {
      const renderResult = render(
        <Provider store={store}>
          <Leaderboard />
        </Provider>
      );
      getAllByRole = renderResult.getAllByRole;
    });
    const cells = getAllByRole("cell");
    expect(cells).toHaveLength(6); // 2 users * 3 columns
  });

  test("should correctly display user names in the leaderboard", () => {
    let getByText;
    act(() => {
      const renderResult = render(
        <Provider store={store}>
          <Leaderboard />
        </Provider>
      );
      getByText = renderResult.getByText;
    });
    expect(getByText("User Alpha")).toBeInTheDocument();
    expect(getByText("User Beta")).toBeInTheDocument();
  });

  test("should match the updated snapshot of the leaderboard component", () => {
    let asFragment;

    act(() => {
      const renderResult = render(
        <Provider store={store}>
          <Leaderboard />
        </Provider>
      );
      asFragment = renderResult.asFragment;
    });

    expect(asFragment()).toMatchSnapshot();
  });

  test("should correctly display the number of cells with the value '1' for the 'isAnswered' column", () => {
    let getAllByText;
    act(() => {
      const renderResult = render(
        <Provider store={store}>
          <Leaderboard />
        </Provider>
      );
      getAllByText = renderResult.getAllByText;
    });
    const isAnsweredCells = getAllByText("1");
    expect(isAnsweredCells).toHaveLength(2);
  });
});
