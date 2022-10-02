import { SendResetPwVerificationMsg } from "../common/Content";
import { FirstComment } from "../common/Logos";
import EmailImageContainer from "../container/EmailImageContainer";
import AuthTemplate from "./AuthTemplate";

const ResetVerifiInfoForm = ({ children }) => {
  return (
    <AuthTemplate>
      <FirstComment>{children}</FirstComment>
      <EmailImageContainer>
        <SendResetPwVerificationMsg></SendResetPwVerificationMsg>
      </EmailImageContainer>
    </AuthTemplate>
  );
};

export default ResetVerifiInfoForm;
