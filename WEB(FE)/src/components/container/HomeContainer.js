import { Link } from "react-router-dom";

const HomeContainer = () => {
  return (
    <>
      <br />
      <Link to="/write">고민 작성하기</Link>
      <br />
      <Link to="/message">채팅</Link>
      <br />
      <Link to="/profile">프로필</Link>
      <br />
      <div className="homePageBody">
        <div className="banner"></div>
        <div className="dashboard"></div>
        <br />
        <div className="newestBoard"></div>
        <div className="popularBoard"></div>
      </div>
    </>
  );
};

export default HomeContainer;
