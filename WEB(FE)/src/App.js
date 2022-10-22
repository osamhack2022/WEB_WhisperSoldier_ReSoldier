import { Route, Routes } from "react-router-dom";
//import { useRecoilState, useRecoilValue } from "recoil";
//import { UserInfo } from "./store/AuthStore";
import HomePage from "./pages/HomePage";
import FirstPage from "./pages/FirstPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import WritePage from "./pages/WritePage";
import SearchPage from "./pages/SearchPage";
import ChatPage from "./pages/ChatPage";
import ResetPage from "./pages/ResetPage";
import TagPage from "./pages/TagPage";
import "./styles/App.css";
import { useEffect, useState } from "react";
import { authService } from "./lib/FAuth";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import styled from "styled-components";
import BoardPage from "./pages/BoardPage";
import { adminSessionKey, whisperSodlierSessionKey } from "./lib/Const";
import WelcomePage from "./pages/WelcomePage";
import LoadPage from "./pages/LoadPage";
import TagBoard from "./pages/TagBoard";

const Body = styled.div`
  position: relative;
`;

const App = () => {
  const [sessionObj, setSessionObj] = useState(
    JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
  );
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(sessionStorage.getItem(adminSessionKey))
  );

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        if (authService.currentUser.emailVerified) {
          setSessionObj(
            JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
          );
        }
      } else {
        setSessionObj(null);
        setIsAdmin(false);
      }
    });
  }, []);

  return (
    <>
      {sessionObj ? (
        sessionObj.providerData[0].displayName ? (
          isAdmin ? (
            <Body>
              <Header isAdmin={isAdmin.admin}></Header>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/post/:id"
                  element={<PostPage isAdmin={isAdmin.admin} />}
                />
                <Route
                  path="/profile"
                  element={<ProfilePage isAdmin={isAdmin.admin} />}
                />
                <Route path="/write" element={<WritePage />} />
                <Route path="/board" element={<BoardPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/message" element={<ChatPage />} />
                <Route path="/tags" element={<TagPage />} />
                <Route path="/tag/:id" element={<TagBoard />} />
              </Routes>
              <Footer></Footer>
            </Body>
          ) : (
            <Routes>
              <Route path="/" element={<LoadPage />}></Route>
            </Routes>
          )
        ) : (
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/" element={<LoadPage />} />
          </Routes>
        )
      ) : (
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/reset" element={<ResetPage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
