import { FirstComment } from "../common/Logos";
import EmailImageContainer from "../container/EmailImageContainer";
import AuthTemplate from "./AuthTemplate";

const EmailVerifiInfoForm = () => {
  return (
    <AuthTemplate>
      <FirstComment>환영합니다!</FirstComment>
      <EmailImageContainer></EmailImageContainer>
    </AuthTemplate>
  );
};

export default EmailVerifiInfoForm;
