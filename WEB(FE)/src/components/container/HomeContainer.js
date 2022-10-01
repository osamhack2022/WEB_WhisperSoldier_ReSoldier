import { Link } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";

const HomeContainer = ({ state, onChange }) => {
  return (
    <>
      <Header state={state} onChange={onChange}></Header>
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
      <Footer></Footer>
    </>
  );
};

export default HomeContainer;
