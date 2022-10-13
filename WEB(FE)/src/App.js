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
import "./styles/App.css";
import { useEffect, useState } from "react";
import { authService, FApiKey } from "./lib/FAuth";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import styled from "styled-components";
import BoardPage from "./pages/BoardPage";
import { whisperSodlierSessionKey } from "./lib/Const";
import WelcomePage from "./pages/WelcomePage";

const Body = styled.div`
  position: relative;
`;

/*각 페이지 라우트*/
const App = () => {
  //const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [sessionObj, setSessionObj] = useState(
    JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
  );
  //const auth = authService.currentUser;

  const currentUserKey = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );

  console.log(currentUserKey);

  /*
  useEffect(() => {
    console.log(auth);
    if (auth) {
      setUserInfo((prev) => ({ ...prev, emailChecked: true, isLogin: true }));
    }
  }, [auth]);*/

  useEffect(() => {
    onAuthStateChanged(authService, (u) => {
      if (u) {
        if (authService.currentUser.emailVerified) {
          // setUserInfo((prev) => ({
          //   ...prev,
          //   emailChecked: true,
          //   isLogin: true,
          // }));
          setSessionObj(
            JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
          );
        } else {
          // setUserInfo((prev) => ({
          //   ...prev,
          //   emailChecked: false,
          //   isLogin: true,
          // }));
        }
      } else {
        //setUserInfo((prev) => ({ ...prev, isLogin: false }));
        setSessionObj(null);
      }
    });
  }, []);

  useEffect(() => {
    setSessionObj(JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey)));
  }, []);
  return (
    <>
      {sessionObj && sessionObj.providerData[0].displayName ? (
        <Body>
          <Header></Header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/write" element={<WritePage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/message" element={<ChatPage />} />
          </Routes>
          <Footer></Footer>
        </Body>
      ) : (
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/reset" element={<ResetPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
