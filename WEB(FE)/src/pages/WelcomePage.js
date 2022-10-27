import { Helmet } from "react-helmet-async";
import WelcomeForm from "../components/auth/WelcomeForm";

const WelcomePage = () => {
  return (
    <>
      <Helmet>
        <title>프로필 설정 - Whisper Soldier</title>
      </Helmet>
      <WelcomeForm></WelcomeForm>
    </>
  );
};

export default WelcomePage;
