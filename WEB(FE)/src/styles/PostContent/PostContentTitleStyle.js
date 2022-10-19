import { RiUser3Line } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

export const PostContentBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  width: 100%;
  height: 60px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
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

export const PostContentTime = styled.div`
  margin-left: 10px;
  font-size: 12px;
  text-align: right;
  position: absolute;
  right: 60px;
  margin-right: 20px;
  letter-spacing: -0.34px;
  color: #4f4f4f;
  font-weight: 400;
`;

export const PostContentTag = styled.div`
  margin-left: 10px;
  font-size: 12px;
  text-align: right;
  position: absolute;
  right: 220px;
  margin-right: 20px;
  letter-spacing: -0.34px;
  color: #4f4f4f;
  font-weight: 400;
`;

const PostContentLikeIcon = styled(AiOutlineHeart)`
  height: 12px;
  width: 12px;
  font-weight: 100;
  margin-right: 5px;
  color: #eb5757;
  fill: #eb5757;
  background-color: rgba(0, 0, 0, 0);
`;

const PostContentMyLikeIcon = styled(AiFillHeart)`
  height: 12px;
  width: 12px;
  font-weight: 100;
  margin-right: 5px;
  color: #eb5757;
  fill: #eb5757;
  background-color: rgba(0, 0, 0, 0);
`;

const PostContentInfoText = styled.div`
  font-size: 12px;
  text-align: left;
  letter-spacing: 0.48px;
  color: #4f4f4f;
  font-weight: 400;
`;

const PostContentLikeBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: 20px;
  align-items: center;
  margin: 0px;
  text-decoration: none;
  height: fit-content;
  width: fit-content;
  align-items: center;
`;

export const PostContentLikeCount = ({ children, isMyLike }) => {
  return (
    <PostContentLikeBox>
      {isMyLike ? (
        <PostContentMyLikeIcon></PostContentMyLikeIcon>
      ) : (
        <PostContentLikeIcon></PostContentLikeIcon>
      )}
      <PostContentInfoText>{children}</PostContentInfoText>
    </PostContentLikeBox>
  );
};

export const UserProfileImg = () => {
  return (
    <UserProfileIconShape>
      <UserProfileIcon></UserProfileIcon>
    </UserProfileIconShape>
  );
};

const MyInfoIcon = styled(FaUserCircle)`
  height: 40px;
  width: 40px;
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
          sx={{ width: 40, height: 40 }}
        />
      ) : (
        <MyInfoIcon></MyInfoIcon>
      )}
    </MyInfoIconBoxStyle>
  );
};
