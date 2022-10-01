/* 아직 사용안함.. 추후 코드 정리하면서 적용할 예정
import styled from "styled-components";
import AuthTemplate from "../auth/AuthTemplate";
import { AuthMainLink, AuthSubLink } from "../common/Buttons";

const Block1 = styled.div`
  margin: 90px 0px 95px 0px;
`;

const FirstContainer = () => {
  return (
    <AuthTemplate>
      <Block1></Block1>
      <AuthMainLink to="/login">로그인</AuthMainLink>
      <br />
      <AuthSubLink to="/register" type="ghost">
        나라사랑포털 이메일로 회원가입하기
      </AuthSubLink>
    </AuthTemplate>
  );
};

export default FirstContainer;
*/
