import { useState } from "react";
import { Button, Dialog, DialogActions } from "@mui/material";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import {
  CancelButton,
  ConfirmButton,
} from "../profile/CheckDefaultProfileImgNestDialog";
import styled from "@emotion/styled";

const CancelReportButton = styled(Button)({
  margin: "10px 0px 0px 0px",
  position: "relative",
  padding: "1px 8px",
  color: "#0d552c",
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
  border: "1px solid rgb(26, 117, 65)",
  "&:hover": {
    background: "#0d552c",
    color: "#ffffff",
  },
});

const CancelReportDialog = ({
  onAcceptOrDenyReport,
  setAlertInfo,
  document,
  isComment,
}) => {
  const [openDialogForCancelReportPost, setOpenDialogForCancelReportPost] =
    useState(false);
  const handleClickOpenDialogForCancelReportPost = () => {
    setOpenDialogForCancelReportPost(true);
  };

  const handleCloseDialogForCancelReportPost = () => {
    setOpenDialogForCancelReportPost(false);
  };

  const onCancelReportPost = (currentDoc) => {
    setOpenDialogForCancelReportPost(false);
    onAcceptOrDenyReport(currentDoc.id, false);
    setAlertInfo((prev) => ({ ...prev, cancelReport: true }));
    setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, cancelReport: false }));
    }, 3000);
  };
  return (
    <>
      <CancelReportButton onClick={handleClickOpenDialogForCancelReportPost}>
        신고 접수 취소
      </CancelReportButton>
      <Dialog
        open={openDialogForCancelReportPost}
        onClose={handleCloseDialogForCancelReportPost}
        aria-labelledby={`alert-dialog-${document.id}-cancel`}
        aria-describedby={`alert-dialog-${document.id}-cancel`}
      >
        <WsDialogTitle>
          {isComment
            ? "댓글 신고 접수를 취소하시겠습니까?"
            : "포스트 신고 접수를 취소하시겠습니까?"}
        </WsDialogTitle>
        <DialogActions>
          <CancelButton
            onClick={handleCloseDialogForCancelReportPost}
            color="primary"
            autoFocus
          >
            취소
          </CancelButton>
          <ConfirmButton
            color="primary"
            onClick={() => onCancelReportPost(document)}
          >
            신고 접수 취소
          </ConfirmButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CancelReportDialog;
