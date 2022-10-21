import {
  BottonLine,
  InputForm,
  PostContentBox,
  PostContentInfoBox,
  PostContentLikeCount,
  PostContentText,
  PostContentTime,
} from "../../styles/PostContent/PostContentBodyStyle";
import {
  TagInput,
  TagInputBox,
  TagInputBoxTitle,
} from "../../styles/write/WriteInputBoxStyle";

const PostContentBody = ({
  postInfo,
  state,
  onChange,
  editing,
  errorPostInfo,
  isMyLike,
}) => {
  return (
    <PostContentBox>
      {postInfo.created_timestamp &&
        (editing ? (
          <>
            <InputForm
              name="editContent"
              value={state.editContent}
              type="text"
              required
              onChange={onChange}
            ></InputForm>
            <BottonLine></BottonLine>
            <TagInputBox>
              <TagInput
                name="editTag"
                value={state.editTag}
                type="text"
                required
                onChange={onChange}
                placeholder="고민 글에 태그를 추가해보세요!"
              ></TagInput>
              <TagInputBoxTitle>
                #{state.editTag.replace(/ /g, "")}
              </TagInputBoxTitle>
            </TagInputBox>
          </>
        ) : (
          !errorPostInfo &&
          (postInfo.post_rep_accept ? (
            "해당 포스트는 관리자에 의해 블라인드 처리되었습니다."
          ) : (
            <>
              <PostContentText>{postInfo.postContent}</PostContentText>
              <PostContentInfoBox>
                <PostContentTime>
                  {postInfo.created_timestamp !== null &&
                    postInfo.created_timestamp}
                </PostContentTime>
                <PostContentLikeCount isMyLike={isMyLike}>
                  {postInfo.created_timestamp !== null && postInfo.like_count}
                </PostContentLikeCount>
              </PostContentInfoBox>
            </>
          ))
        ))}
    </PostContentBox>
  );
};

export default PostContentBody;
