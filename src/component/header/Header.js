import { AppBar, Avatar, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { MenuHeader } from "./MenuHeader";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { _path } from "../../constants/_path";

export const Header = () => {
  const location = useLocation();
  const authUser = useSelector((state) => state.authUser);
  const loggedIn = !!authUser;
  const allUsers = useSelector((state) => state.allUsers);
  return (
    <div>
      <AppBar position="static" color="inherit" enableColorOnDark>
        <Toolbar>
          <Stack
            direction="row"
            spacing={{ xs: 3, sm: 6, md: 9 }}
            justifyContent="center"
            alignItems="center"
          >
            <Stack direction="row" spacing={1}>
              {loggedIn === true && (
                <Stack direction="row" spacing={2}>
                  <MenuHeader text="Home" href={_path.RootPathUrl} />
                  <MenuHeader text="Leaderboard" href={_path.LeaderBoardUrl} />
                  <MenuHeader text="New" href={_path.NewQuestionUrl} />
                </Stack>
              )}
            </Stack>
            {loggedIn === true ? (
              <Stack direction="row" spacing={2}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar
                    variant="circular"
                    sx={{ width: 24, height: 24 }}
                    src={allUsers[authUser.id].avatarURL}
                  />
                  <Typography fontSize="14px">
                    {allUsers[authUser.id].name}
                  </Typography>
                </Stack>
                <MenuHeader text="SignOut" href={_path.SignOutUrl} />
              </Stack>
            ) : (
              <Stack direction="row" spacing={2}>
                <MenuHeader
                  text="SignIn"
                  href={_path.LogInUrl + "?redirectTo=" + location.pathname}
                />
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};
