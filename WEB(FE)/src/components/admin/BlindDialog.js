import { Button, Dialog, DialogActions } from "@mui/material";
import { useState } from "react";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import {
  CancelButton,
  ConfirmButton,
} from "../profile/CheckDefaultProfileImgNestDialog";
import styled from "@emotion/styled";

const PostBlindButton = styled(Button)({
  position: "relative",
  padding: "1px 8px",
  color: "#A65646",
  height: "31px",
  width: "100px",
  backgroundColor: "rgba(0, 0, 0, 0)",
  fontFamily: "IBM Plex Sans KR, sans-serif",
  fontWeight: "500",
  fontSize: "11px",
  textAlign: "center",
  textDecoration: "none",
  borderRadius: "25px",
  marginLeft: "10px",
  border: "1px solid #A65646",
  "&:hover": {
    background: "#A65646",
    color: "#ffffff",
  },
});

const BlindDialog = ({
  onAcceptOrDenyReport,
  setAlertInfo,
  document,
  isComment,
}) => {
  const [openDialogForBlindPost, setOpenDialogForBlindPost] = useState(false);
  const handleClickOpenDialogForBlindPost = () => {
    setOpenDialogForBlindPost(true);
  };

  const handleCloseDialogForBlindPost = () => {
    setOpenDialogForBlindPost(false);
  };

  const onBlindPost = (currentDoc) => {
    setOpenDialogForBlindPost(false);
    onAcceptOrDenyReport(currentDoc.id, true);
    setAlertInfo((prev) => ({ ...prev, blindPost: true }));
    setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, blindPost: false }));
    }, 3000);
  };
  return (
    <>
      <PostBlindButton onClick={handleClickOpenDialogForBlindPost}>
        {isComment ? "댓글 블라인드" : "포스트 블라인드"}
      </PostBlindButton>
      <Dialog
        open={openDialogForBlindPost}
        onClose={handleCloseDialogForBlindPost}
        aria-labelledby={`alert-dialog-${document.id}-blind`}
        aria-describedby={`alert-dialog-${document.id}-blind`}
      >
        <WsDialogTitle>
          {isComment
            ? "댓글을 블라인드 하시겠습니까?"
            : "포스트를 블라인드 하시겠습니까?"}
        </WsDialogTitle>
        <DialogActions>
          <ConfirmButton
            onClick={handleCloseDialogForBlindPost}
            color="primary"
            autoFocus
          >
            취소
          </ConfirmButton>
          <CancelButton color="primary" onClick={() => onBlindPost(document)}>
            블라인드
          </CancelButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlindDialog;
