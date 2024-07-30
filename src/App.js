import { useEffect } from "react";
import { handleInitialData } from "./actions/shareQ";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "./component/login/Login";
import { _path } from "./constants/_path";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./component/dashboard/Dashboard";
import AuthGuard from "./component/AuthGuard/AuthGuard";
import { Header } from "./component/header/Header";
import { Logout } from "./component/login/Logout";
import Leaderboard from "./component/leaderBoard/LeaderBoard";
import { Poll } from "./component/polls/Poll";
import { NewPoll } from "./component/newpoll/NewPoll";
function App() {
  const isLoggin = useSelector((state) => !!state.authUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);
  return (
    <div className="containter">
      {isLoggin && <Header />}
      <Routes>
        <Route path={_path.LogInUrl} exact element={<Login />} />
        <Route
          path={_path.LeaderBoardUrl}
          element={
            <AuthGuard>
              <Leaderboard />
            </AuthGuard>
          }
        />
        <Route
          path="/"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } />
        <Route
          path={_path.QuestionUrl}
          element={
            <AuthGuard>
              <Poll />
            </AuthGuard>
          } />
        <Route
          path={_path.NewQuestionUrl}
          element={
            <AuthGuard>
              <NewPoll />
            </AuthGuard>
          }
        />
        <Route path={_path.SignOutUrl} element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
