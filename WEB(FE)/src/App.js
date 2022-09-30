import {Route, Routes, useNavigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import FirstPage from './pages/FirstPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import WritePage from './pages/WritePage';
import SearchPage from './pages/SearchPage';
import { useEffect, useState } from 'react';
import { authService } from "./lib/FAuth";
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    onAuthStateChanged(authService, (u) => {
      if (u) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, [])
  return (
    <>
      {
      isLogin?
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/post/:id' element={<PostPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/write' element={<WritePage/>}/>
        <Route path='/search' element={<SearchPage/>}/>
      </Routes> :
      <Routes>
        <Route path='/' element={<FirstPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<SignupPage/>}/>
    </Routes>
      }
    </>
  );
}

export default App;
