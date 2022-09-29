import { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [searchWord, setSearchWord] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "search") {
      setSearchWord(value);
    }
  };
  return (
    <div>
      <input
        name="search"
        type="search"
        placeholder="검색어를 입력하세요"
        value={searchWord}
        onChange={onChange}
      />
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
    </div>
  );
};

export default HomePage;
