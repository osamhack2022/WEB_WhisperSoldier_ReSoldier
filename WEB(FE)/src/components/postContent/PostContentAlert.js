import { NicknameTextBox } from "../../styles/profile/ChangeProfileStyle";

const PostContentAlert = ({ alertInfo }) => {
  return (
    <>
      <NicknameTextBox success={alertInfo.editPost}>
        포스트를 수정했습니다.
      </NicknameTextBox>
      <NicknameTextBox success={alertInfo.createComment}>
        댓글을 작성했습니다.
      </NicknameTextBox>
      <NicknameTextBox success={alertInfo.addLikePost}>
        포스트를 공감했습니다.
      </NicknameTextBox>
      <NicknameTextBox success={alertInfo.subLikePost}>
        포스트 공감을 취소했습니다.
      </NicknameTextBox>
      <NicknameTextBox success={alertInfo.deleteComment} redcolor="true">
        댓글을 삭제했습니다.
      </NicknameTextBox>
      <NicknameTextBox success={alertInfo.editComment}>
        댓글을 수정했습니다.
      </NicknameTextBox>
      <NicknameTextBox success={alertInfo.addLikeComment}>
        댓글을 공감했습니다.
      </NicknameTextBox>
      <NicknameTextBox success={alertInfo.subLikeComment}>
        댓글 공감을 취소했습니다.
      </NicknameTextBox>
      <NicknameTextBox success={alertInfo.reportPost}>
        포스트 신고 접수되었습니다.
      </NicknameTextBox>
      <NicknameTextBox success={alertInfo.reportComment}>
        댓글 신고 접수되었습니다.
      </NicknameTextBox>
    </>
  );
};

export default PostContentAlert;
