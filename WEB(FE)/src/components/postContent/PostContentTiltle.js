import {
  LoadingText,
  PostContentBox,
  PostContentLikeCount,
  PostContentTiltleText,
  PostContentTime,
  PostUserBox,
  UserProfileImg,
} from "../../styles/PostContent/PostContentTitleStyle";

const PostContentTitle = ({ postInfo, errorPostInfo, isMyLike }) => {
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
      {postInfo.created_timestamp ? (
        <>
          <PostContentTime>
            {postInfo.created_timestamp !== null
              ? postInfo.created_timestamp
              : ""}
          </PostContentTime>
          <PostContentLikeCount isMyLike={isMyLike}>
            {postInfo.like_count}
          </PostContentLikeCount>
        </>
      ) : (
        <></>
      )}
    </PostContentBox>
  );
};

export default PostContentTitle;
