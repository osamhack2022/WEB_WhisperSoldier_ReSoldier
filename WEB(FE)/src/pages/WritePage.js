import { Helmet } from "react-helmet-async";
import WriteContainer from "../components/Write/WriteContainer";

const WritePage = () => {
  return (
    <>
      <Helmet>
        <title>고민 작성하기 - Whisper Soldier</title>
      </Helmet>
      <WriteContainer />
    </>
  );
};

export default WritePage;
