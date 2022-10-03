import styled from "styled-components";
import AuthTemplate from "../components/auth/AuthTemplate";
import { AuthMainLink, AuthSubLink } from "../components/common/Buttons";
import { FirstComment } from "../components/common/Logos";
import "../styles/FirstPage.css";

const Block1 = styled.div`
  margin: 85px 0px 84px 0px;
`;

const FirstPage = () => {
  return (
    <div>
      <AuthTemplate>
        <FirstComment>고민이 있을땐 언제든지</FirstComment>
        <Block1></Block1>
        <AuthMainLink to="/login">로그인</AuthMainLink>
        <AuthSubLink to="/register" type="ghost">
          나라사랑포털 이메일로 회원가입하기
        </AuthSubLink>
      </AuthTemplate>
    </div>
  );
};

export default FirstPage;
