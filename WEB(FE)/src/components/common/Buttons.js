import { Link } from "react-router-dom";
import styled from "styled-components";

export const AuthButton = styled.button`
  height: 48px;
  width: 320px;
  background-color: #1a7541;
  border-radius: 25px;
  border: 2px solid rgb(26, 117, 65);
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.56px;
  margin: 10px 0 10px;
  color: #ffffff;
  font-weight: 600;
  transition: all 0.5s;
  &:hover {
    background: #0d552c;
  }
`;

export const AuthMainLink = styled(Link)`
  height: 48px;
  width: 320px;
  background-color: #1a7541;
  border-radius: 25px;
  border: 2px solid rgb(26, 117, 65);
  margin: 10px 0 10px;
  font-size: 14px;
  line-height: 48px;
  text-align: center;
  letter-spacing: 0.56px;
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.5s;
  &:hover {
    background: #0d552c;
  }
`;

export const AuthLoadingButton = styled.div`
  height: 48px;
  width: 320px;
  background-color: #c8c8c8;
  border-radius: 25px;
  border: 2px solid #003000;
  margin: 10px 0 10px;
  font-size: 14px;
  line-height: 48px;
  text-align: center;
  letter-spacing: 0.56px;
  color: #003000;
  font-weight: 600;
`;

export const AuthErrorButton = styled.div`
  height: 48px;
  width: 320px;
  background-color: #a65646;
  border-radius: 25px;
  border: 2px solid rgb(166, 86, 70);
  margin: 10px 0 10px;
  font-size: 14px;
  line-height: 48px;
  text-align: center;
  letter-spacing: 0.56px;
  color: #ffffff;
  font-weight: 600;
  animation: vibration 0.1s 5;

  @keyframes vibration {
    from {
      transform: rotate(0.5deg);
    }
    to {
      transform: rotate(-0.5deg);
    }
  }
`;

export const AuthSubLink = styled(Link)`
  height: 48px;
  width: 320px;
  padding: auto;
  background-color: #c8c8c8;
  margin: 10px 0 10px;
  border-radius: 25px;
  border: 2px solid rgb(0, 48, 0);
  line-height: 48px;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.56px;
  color: #3f3f3f;
  font-weight: 600;
  transition: all 0.5s;
  &:hover {
    background: #a6a6a6;
  }
`;

export const FindPasswordButtonBlock = styled.div`
  margin: 5px 0px;
  height: 30px;
  width: fit-content;
  align-items: center;
  border-bottom: #4f4f4f solid 2px;
  transition: all 0.2s;
  &:hover {
    color: #003000;
    border-bottom: #003000 solid 3px;
  }
`;

export const FindPasswordButtonLink = styled(Link)`
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.48px;
  text-decoration: none;
  color: #4f4f4f;
  font-weight: 600;
  &:hover {
    color: #003000;
  }
`;

export const FindPasswordButtonLine = styled.div`
  height: 3px;
  background-color: #4f4f4f;
`;

export const FindPasswordButton = ({ toLink, children }) => {
  return (
    <FindPasswordButtonBlock>
      <FindPasswordButtonLink to={toLink}>{children}</FindPasswordButtonLink>
      {/* <FindPasswordButtonLine></FindPasswordButtonLine> */}
    </FindPasswordButtonBlock>
  );
};

export const FindPasswordButtonsContainer = styled.div`
  display: flex;
  padding: 0px 10px;
  justify-content: space-between;
`;

export const FindPasswordButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
