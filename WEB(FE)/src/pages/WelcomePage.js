import styled from "styled-components";
import WelcomeForm from "../components/auth/WelcomeForm";
import media from "../modules/MediaQuery";

const WelcomePageContainer = styled.div`
  margin: 0px auto;
  width: 960px;
  display: flex;
  flex-direction: row;
  ${media.smallDesktop`
    margin: inherit;
    width: inherit;
    padding: 0px 10vw;
  `}
  ${media.mobile`
  flex-direction:column;
    padding: 0px 5vw;
  `}
`;

const WelcomePage = () => {
  return (
    <div>
      <WelcomeForm></WelcomeForm>
    </div>
  );
};

export default WelcomePage;
