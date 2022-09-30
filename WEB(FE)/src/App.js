import { Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserInfo } from "./store/AuthStore";
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
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

/*각 페이지 라우트*/
const App = () => {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const auth = getAuth().currentUser;
  console.log(userInfo);
  useEffect(() => {
    console.log(auth);
    if (auth) {
      setUserInfo((prev) => ({ ...prev, emailChecked: true, isLogin: true }));
    }
  }, [auth]);
  return (
    <>
      {userInfo.isLogin ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/message" element={<ChatPage />} />
        </Routes>
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
