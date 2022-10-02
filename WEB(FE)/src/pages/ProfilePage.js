import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../lib/FAuth";

const ProfilePage = () => {
  const navigate = useNavigate();
  const onClick = async () => {
    await signOut(authService).then(() => {
      console.log("[Profile.js]로그아웃 성공");
    });
    navigate("/");
  };
  return (
    <div>
      <div>프로필 페이지 페이지</div>
      <br />
      <Link to="/">홈페이지</Link>
      <br />
      <button onClick={onClick}>로그아웃</button>
    </div>
  );
};

export default ProfilePage;
