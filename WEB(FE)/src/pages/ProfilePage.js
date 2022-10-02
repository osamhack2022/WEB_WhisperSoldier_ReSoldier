import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div>
      <div>프로필 페이지 페이지</div>
      <br />
      <Link to="/">홈페이지</Link>
      <br />
      <button>로그아웃</button>
    </div>
  );
};

export default ProfilePage;
