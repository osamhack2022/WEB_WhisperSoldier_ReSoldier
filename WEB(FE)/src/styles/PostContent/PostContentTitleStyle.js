import { RiUser3Line } from "react-icons/ri";

import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

export const WritePostTitle = styled.div`
  font-size: 18px;
  text-align: center;
  letter-spacing: 0.64px;
  color: #000000;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 700;
  margin-right: 10px;
`;

export const PostContentBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 60px;
  border-bottom: ${(props) =>
    props.editing ? "1px solid #bdbdbd" : "1px solid #dcdcdc"};
`;

export const PostUserBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
`;

export const PostContentTiltleText = styled.div`
  margin-left: 10px;
  font-size: 14px;
  text-align: left;
  letter-spacing: -0.34px;
  color: #000000;
  font-weight: 600;
`;

export const LoadingText = styled.div`
  font-size: 14px;
  text-align: left;
  letter-spacing: -0.34px;
  color: #000000;
  font-weight: 600;
`;

const UserProfileIcon = styled(RiUser3Line)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 20px;
  width: 20px;
  padding: 5px;
  font-weight: 100;
  color: #000000;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    color: #ffffff;
  }
`;

const UserProfileIconShape = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  height: 20px;
  width: 20px;
  border-radius: 50%;
  transition: all 0.5s;
  border: 1px solid #000000;
  &:hover {
    background: #0d552c;
  }
`;

export const PostContentTag = styled.div`
  margin-left: 15px;
  font-size: 12px;
  text-align: right;
  /* position: absolute; */
  /* right: 220px; */
  margin-right: 20px;
  letter-spacing: -0.34px;
  color: #4f4f4f;
  font-weight: 400;
`;

export const UserProfileImg = () => {
  return (
    <UserProfileIconShape>
      <UserProfileIcon></UserProfileIcon>
    </UserProfileIconShape>
  );
};

const MyInfoIcon = styled(FaUserCircle)`
  height: 30px;
  width: 30px;
  color: #555555;
`;

const MyInfoIconBoxStyle = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
`;

export const MyInfoIconBox = ({ postUserProfileImg }) => {
  return (
    <MyInfoIconBoxStyle>
      {postUserProfileImg ? (
        <Avatar
          alt="userImg"
          src={postUserProfileImg}
          sx={{ width: 30, height: 30 }}
        />
      ) : (
        <MyInfoIcon></MyInfoIcon>
      )}
    </MyInfoIconBoxStyle>
  );
};
