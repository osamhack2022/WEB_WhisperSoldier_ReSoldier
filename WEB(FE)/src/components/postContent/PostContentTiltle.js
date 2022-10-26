import { Dialog, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import checkCurseWord from "../../modules/CheckCurseWord";
import { PostContentErrorText } from "../../styles/PostContent/PostContentBodyStyle";
import {
  EditHeaderFlexBox,
  LoadingText,
  MyInfoIconBox,
  PostContentBox,
  PostContentTag,
  PostContentTiltleText,
  PostUserBox,
  WritePostButton,
  WritePostTitle,
} from "../../styles/PostContent/PostContentTitleStyle";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import {
  CancelButton,
  ConfirmButton,
} from "../profile/CheckDefaultProfileImgNestDialog";

const PostContentTitle = ({
  editing,
  postInfo,
  errorPostInfo,
  postUserNickname,
  postUserProfileImg,
  onClick,
  errorEditInfo,
  state,
  setErrorEditInfo,
  setAlertInfo,
}) => {
  const [openDialogForEditPost, setOpenDialogForEditPost] = useState(false);
  const handleClickOpenDialogForEditPost = () => {
    if (state.editContent.length === 0) {
      setErrorEditInfo(true);
      setTimeout(() => {
        setErrorEditInfo(false);
      }, 3000);
    } else if (state.editTag.length === 1) {
      setAlertInfo((prev) => ({ ...prev, tagOneLetterInput: true }));
      setTimeout(() => {
        setAlertInfo((prev) => ({ ...prev, tagOneLetterInput: false }));
      }, 3000);
    } else {
      const curseWord = checkCurseWord(state.editContent);
      if (curseWord) {
        setAlertInfo((prev) => ({ ...prev, impertinencePost: true }));
        setTimeout(() => {
          setAlertInfo((prev) => ({ ...prev, impertinencePost: false }));
        }, 3000);
      } else {
        setOpenDialogForEditPost(true);
      }
    }
  };

  const handleCloseDialogForEditPost = () => {
    setOpenDialogForEditPost(false);
  };

  const editPostClickAndClose = () => {
    onClick();
    setOpenDialogForEditPost(false);
  };

  return (
    <PostContentBox editing={editing}>
      <PostUserBox>
        {postInfo.created_timestamp ? (
          editing ? (
            <EditHeaderFlexBox>
              <WritePostTitle>고민 수정하기</WritePostTitle>
              <WritePostButton
                onClick={handleClickOpenDialogForEditPost}
                errorWritePostInfo={errorEditInfo}
              >
                {errorEditInfo ? "내용을 입력해 주세요" : "수정완료"}
              </WritePostButton>
              <Dialog
                open={openDialogForEditPost}
                onClose={handleCloseDialogForEditPost}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <WsDialogTitle>고민 수정 완료하시겠습니까?</WsDialogTitle>
                <DialogActions>
                  <CancelButton
                    // onClick={}
                    onClick={handleCloseDialogForEditPost}
                    color="primary"
                    autoFocus
                  >
                    취소
                  </CancelButton>
                  <ConfirmButton
                    color="primary"
                    onClick={editPostClickAndClose}
                  >
                    수정완료
                  </ConfirmButton>
                </DialogActions>
              </Dialog>
            </EditHeaderFlexBox>
          ) : (
            <>
              <MyInfoIconBox
                postUserProfileImg={postUserProfileImg}
              ></MyInfoIconBox>
              <PostContentTiltleText>
                {postUserNickname.length > 0 ? postUserNickname : "익명"}
              </PostContentTiltleText>
            </>
          )
        ) : !errorPostInfo ? (
          <LoadingText>잠시만 기다려주세요</LoadingText>
        ) : (
          <PostContentErrorText>
            찾으려는 포스트가 존재하지 않습니다.
          </PostContentErrorText>
        )}
      </PostUserBox>
      {postInfo.created_timestamp && !editing ? (
        <>
          <PostContentTag>
            {!postInfo.post_rep_accept &&
              !postInfo.post_rep_accept &&
              postInfo.tag_name &&
              `#${postInfo.tag_name}`}
          </PostContentTag>
        </>
      ) : (
        <></>
      )}
    </PostContentBox>
  );
};

export default PostContentTitle;
