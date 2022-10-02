import { SendEmailVerificationMsg } from "../common/Content";
import { FirstComment } from "../common/Logos";
import EmailImageContainer from "../container/EmailImageContainer";
import AuthTemplate from "./AuthTemplate";

const EmailVerifiInfoForm = ({ children }) => {
  return (
    <AuthTemplate>
      <FirstComment>{children}</FirstComment>
      <EmailImageContainer>
        <SendEmailVerificationMsg></SendEmailVerificationMsg>
      </EmailImageContainer>
    </AuthTemplate>
  );
};

export default EmailVerifiInfoForm;
