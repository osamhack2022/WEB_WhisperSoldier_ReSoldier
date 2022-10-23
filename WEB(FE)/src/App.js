import { Route, Routes } from "react-router-dom";
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
import TagBoard from "./pages/TagBoardPage";
import NotFoundPage from "./pages/NotFoundPage";

const Body = styled.div`
  position: relative;
`;

const App = () => {
  // session storage에 저장된 유저 로그인 정보 객체
  const [sessionObj, setSessionObj] = useState(
    JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
  );
  // session storage에 저장된 관리자 유무 정보 객체
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(sessionStorage.getItem(adminSessionKey))
  );

  //
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
      {/*각 페이지별 라우트 
    - 로그인 정보 객체가 있을 경우 서비스 화면, 없을 경우 로그인 관련 화면을 보여준다. */}
      {sessionObj ? (
        /*닉네임이 없을 경우 회원가입 후 첫 로그인으로 간주하여 초기 프로필 설정 페이지로 이동한다. 
        이외의 경우 서비스 화면을 보여준다*/
        sessionObj.providerData[0].displayName ? (
          /*관리자 정보 객체 정보가 생성된 후 서비스 화면을 보여주도록 한다.*/
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
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/notfound" element={<NotFoundPage />} />
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
