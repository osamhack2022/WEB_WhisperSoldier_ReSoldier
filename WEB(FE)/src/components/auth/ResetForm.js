import styled from "styled-components";
import {
  AuthButton,
  AuthErrorButton,
  AuthLoadingButton,
  FindPasswordButton,
  FindPasswordButtonContainer,
} from "../common/Buttons";
import { AuthInputBox } from "../common/InputBox";
import AuthTemplate from "./AuthTemplate";

const Block1 = styled.div`
  margin: 35px 0px 35px 0px;
`;

const ResetForm = ({ onSubmit, email, onChange, resetErrorInfo }) => {
  return (
    <div>
      <AuthTemplate>
        <Block1></Block1>
        <form onSubmit={onSubmit}>
          <AuthInputBox
            name="email"
            type="email"
            placeholder="나라사랑포털 이메일"
            value={email}
            onChange={onChange}
            required
            autoFocus
            error={resetErrorInfo.isErr}
          ></AuthInputBox>
          {resetErrorInfo.isErr ? (
            <AuthErrorButton>{resetErrorInfo.errMsg}</AuthErrorButton>
          ) : resetErrorInfo.isLoading ? (
            <AuthLoadingButton>잠시만 기다려주세요</AuthLoadingButton>
          ) : (
            <AuthButton>비밀번호 재설정하기</AuthButton>
          )}
        </form>

        <FindPasswordButtonContainer>
          <FindPasswordButton toLink="/">처음으로</FindPasswordButton>
        </FindPasswordButtonContainer>
      </AuthTemplate>
    </div>
  );
};

export default ResetForm;
