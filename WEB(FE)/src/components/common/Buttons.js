import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { RiUser3Line } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";

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

export const SearchButtonShape = styled.button`
  position: relative;
  margin-left: 10px;
  background-color: #1a7541;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  transition: all 0.5s;
  border: 2px solid rgb(26, 117, 65);
  &:hover {
    background: #0d552c;
  }
`;

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
`;

const WritePostButtonShape = styled(Link)`
  position: relative;
  padding: 7px 15px;
  color: #ffffff;
  height: 40px;
  width: 140px;
  background-color: #1a7541;
  font-weight: 500;
  font-size: 14px;
  text-align: right;
  text-decoration: none;
  border-radius: 25px;
  border: 2px solid rgb(26, 117, 65);
  transition: all 0.5s;
  &:hover {
    background: #0d552c;
  }
`;

const WritPostIcon = styled(BsPencilSquare)`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(0%, -50%);
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
`;

export const WritePostButton = () => {
  return (
    <WritePostButtonShape to="/write">
      <WritPostIcon></WritPostIcon> 고민 작성하기
    </WritePostButtonShape>
  );
};

const WriteIcon = styled(BsPencilSquare)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 40px;
  width: 40px;
  padding: 12px;
  font-weight: 100;
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
`;

const WriteButtonShape = styled(Link)`
  position: relative;
  background-color: #1a7541;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  transition: all 0.5s;
  border: 2px solid rgb(26, 117, 65);
  &:hover {
    background: #0d552c;
  }
`;

export const WritePostSmallButton = () => {
  return (
    <WriteButtonShape to="/write">
      <WriteIcon></WriteIcon>
    </WriteButtonShape>
  );
};

const UserProfileIcon = styled(RiUser3Line)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 40px;
  width: 40px;
  padding: 12px;
  font-weight: 100;
  color: #0d552c;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    color: #ffffff;
  }
`;

const UserProfileButtonShape = styled(Link)`
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  margin-left: 10px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  transition: all 0.5s;
  border: 2px solid rgb(26, 117, 65);
  &:hover {
    background: #0d552c;
  }
`;

export const UserProfileButton = () => {
  return (
    <UserProfileButtonShape to="/profile">
      <UserProfileIcon></UserProfileIcon>
    </UserProfileButtonShape>
  );
};

const ChatIcon = styled(BsChatDots)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 40px;
  width: 40px;
  padding: 12px;
  font-weight: 100;
  color: #0d552c;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    color: #ffffff;
  }
`;

const ChatButtonShape = styled(Link)`
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  height: 40px;
  width: 40px;
  margin-left: 10px;
  border-radius: 50%;
  transition: all 0.5s;
  border: 2px solid rgb(26, 117, 65);
  &:hover {
    background: #0d552c;
  }
`;

export const ChatButton = () => {
  return (
    <ChatButtonShape to="/message">
      <ChatIcon></ChatIcon>
    </ChatButtonShape>
  );
};
