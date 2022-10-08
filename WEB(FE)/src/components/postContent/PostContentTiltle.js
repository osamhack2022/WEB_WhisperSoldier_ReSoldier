import { RiUser3Line } from "react-icons/ri";
import styled from "styled-components";

const PostContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  width: 100%;
  height: 42px;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
`;

const PostUserBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: fit-content;
`;

const PostContentTiltleText = styled.div`
  margin-left: 10px;
  font-size: 14px;
  text-align: left;
  letter-spacing: -0.34px;
  color: #000000;
  font-weight: 600;
`;

const LoadingText = styled.div`
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

const PostContentTime = styled.div`
  margin-left: 10px;
  font-size: 12px;
  text-align: right;
  letter-spacing: -0.34px;
  color: #4f4f4f;
  font-weight: 400;
`;

const UserProfileImg = () => {
  return (
    <UserProfileIconShape>
      <UserProfileIcon></UserProfileIcon>
    </UserProfileIconShape>
  );
};

const PostContentTitle = ({ postInfo, errorPostInfo }) => {
  return (
    <PostContentBox>
      <PostUserBox>
        {postInfo.created_timestamp ? (
          <>
            <UserProfileImg></UserProfileImg>
            <PostContentTiltleText>익명</PostContentTiltleText>
          </>
        ) : (
          !errorPostInfo && <LoadingText>잠시만 기다려주세요</LoadingText>
        )}
      </PostUserBox>

      <PostContentTime>
        {postInfo.created_timestamp !== null ? postInfo.created_timestamp : ""}
      </PostContentTime>
      <div>
        <img src="https://blog.kakaocdn.net/dn/MycgT/btrD4WknzEo/6VdswUypGe0QlvCFeiUYpk/img.png" width="20px" alt="공감 아이콘" />
        {postInfo.like_count}
      </div>
    </PostContentBox>
  );
};

export default PostContentTitle;
