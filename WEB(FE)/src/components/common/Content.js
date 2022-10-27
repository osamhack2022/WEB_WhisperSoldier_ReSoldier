import styled from "styled-components";

const MsgBlock = styled.div`
  font-size: 15px;
  line-height: 2.14;
  text-align: center;
  color: #333333;
  font-weight: 500;
  height: 60px;
  width: 309px;
  margin: 10px 0px;
`;

export const SendEmailVerificationMsg = () => {
  return (
    <MsgBlock>
      이메일 인증메일을 발송했습니다.
      <br />
      나라사랑포털 로그인하여 인증메일을 확인해주세요
    </MsgBlock>
  );
};

export const SendResetPwVerificationMsg = () => {
  return (
    <MsgBlock>
      비밀번호 재설정 메일을 발송했습니다.
      <br />
      나라사랑포털 로그인하여 메일을 확인해주세요
    </MsgBlock>
  );
};
