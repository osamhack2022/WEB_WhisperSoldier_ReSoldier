import styled from "styled-components";
import AuthTemplate from "../components/auth/AuthTemplate";
import { AuthMainLink, AuthSubLink } from "../components/common/Buttons";

const Block1 = styled.div`
  margin: 90px 0px 95px 0px;
`;

const FirstPage = () => {
  return (
    <div>
      <div>첫 페이지</div>
      <div></div>
      <AuthTemplate>
        <Block1></Block1>
        <AuthMainLink to="/login">로그인</AuthMainLink>
        <br />
        <AuthSubLink to="/register" type="ghost">
          나라사랑포털 이메일로 회원가입하기
        </AuthSubLink>
      </AuthTemplate>
    </div>
  );
};

export default FirstPage;
