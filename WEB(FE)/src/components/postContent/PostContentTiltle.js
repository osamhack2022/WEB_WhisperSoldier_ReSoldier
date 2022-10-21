import {
  LoadingText,
  MyInfoIconBox,
  PostContentBox,
  PostContentTag,
  PostContentTiltleText,
  PostUserBox,
  WritePostTitle,
} from "../../styles/PostContent/PostContentTitleStyle";
import { WritePostButton } from "../Write/WriteInputBoxHeader";

const PostContentTitle = ({
  editing,
  postInfo,
  errorPostInfo,
  postUserNickname,
  postUserProfileImg,
  onClick,
  errorEditInfo,
}) => {
  return (
    <PostContentBox editing={editing}>
      <PostUserBox>
        {postInfo.created_timestamp ? (
          editing ? (
            <>
              <WritePostTitle>고민 수정하기</WritePostTitle>
              <WritePostButton
                onClick={onClick}
                errorWritePostInfo={errorEditInfo}
              >
                {errorEditInfo ? "내용을 입력해 주세요" : "작성완료"}
              </WritePostButton>
            </>
          ) : (
            <>
              <MyInfoIconBox
                postUserProfileImg={postUserProfileImg}
              ></MyInfoIconBox>
              <PostContentTiltleText>
                {postUserNickname.length > 0 ? postUserNickname : "닉네임 없음"}
              </PostContentTiltleText>
            </>
          )
        ) : (
          !errorPostInfo && <LoadingText>잠시만 기다려주세요</LoadingText>
        )}
      </PostUserBox>
      {postInfo.created_timestamp && !editing ? (
        <>
          <PostContentTag>
            {postInfo.tag_name && `#${postInfo.tag_name}`}
          </PostContentTag>
        </>
      ) : (
        <></>
      )}
    </PostContentBox>
  );
};

export default PostContentTitle;
