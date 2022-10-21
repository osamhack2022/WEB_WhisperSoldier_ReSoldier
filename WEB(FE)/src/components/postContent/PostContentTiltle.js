import {
  LoadingText,
  MyInfoIconBox,
  PostContentBox,
  PostContentLikeCount,
  PostContentTag,
  PostContentTiltleText,
  PostContentTime,
  PostUserBox,
  UserProfileImg,
} from "../../styles/PostContent/PostContentTitleStyle";

const PostContentTitle = ({
  postInfo,
  errorPostInfo,
  isMyLike,
  postUserNickname,
  postUserProfileImg,
}) => {
  return (
    <PostContentBox>
      <PostUserBox>
        {postInfo.created_timestamp ? (
          <>
            <MyInfoIconBox
              postUserProfileImg={postUserProfileImg}
            ></MyInfoIconBox>
            <PostContentTiltleText>
              {postUserNickname.length > 0 ? postUserNickname : "닉네임 없음"}
            </PostContentTiltleText>
          </>
        ) : (
          !errorPostInfo && <LoadingText>잠시만 기다려주세요</LoadingText>
        )}
      </PostUserBox>
      
      {postInfo.created_timestamp ? (
        <>
          <PostContentTag>
            {!postInfo.post_rep_accept && postInfo.tag_name && `#${postInfo.tag_name}`}
          </PostContentTag>

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
