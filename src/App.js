import { useEffect } from "react";
import { handleInitialData } from "./actions/shareQ";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "./component/login/Login";
import { _path } from "./constants/_path";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard } from "./component/dashboard/Dashboard";
import AuthGuard from "./component/AuthGuard/AuthGuard";
import { Header } from "./component/header/Header";
import { Logout } from "./component/login/Logout";
import Leaderboard from "./component/leaderBoard/LeaderBoard";
import { Poll } from "./component/polls/Poll";
import { NewPoll } from "./component/newpoll/NewPoll";
import NotFound from "./component/notFound/NotFound";

function App() {
  const isLoggedIn = useSelector((state) => !!state.authUser);
  const allQuestions = useSelector((state) => state.allQuestions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  useEffect(() => {
    const handleInvalidQuestion = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get("redirectTo");
      const questionId = redirectUrl ? redirectUrl.split("/").pop() : null;

      if (isLoggedIn && questionId && !Object.keys(allQuestions).includes(questionId)) {
        navigate(_path.NotFoundUrl);
      }
    };

    handleInvalidQuestion();
  }, [isLoggedIn, navigate, allQuestions]);

  return (
    <div className="container">
      {isLoggedIn && <Header />}
      <Routes>
        <Route path={_path.LogInUrl} element={<Login />} />
        <Route
          path={_path.RootPathUrl}
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route path={_path.LeaderBoardUrl} element={<Leaderboard />} />
        <Route path={_path.QuestionUrl} element={<Poll />} />
        <Route path={_path.NewQuestionUrl} element={<NewPoll />} />
        <Route path={_path.SignOutUrl} element={<Logout />} />
        <Route path={_path.NotFoundUrl} element={<NotFound />} />
        <Route path={_path.OtherUrl} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
