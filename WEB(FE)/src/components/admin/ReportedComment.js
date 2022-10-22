import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbFunction, dbService } from "../../lib/FStore";
import {
  NicknameTextBox,
  SectionTitle,
} from "../../styles/profile/ChangeProfileStyle";
import { ProfileCotentBox } from "../../styles/profile/ProfilePageStyle";
import MoreLoadPostButton from "../post/MoreLoadPostButton";
import {
  ReportPostButtonBox,
  ReportPostContentBox,
  ReportPostElementBlock,
} from "../../styles/admin/ReportedPostStyle";
import { CancelReportButton, PostBlindButton } from "./ReportedPost";
import CommentElement from "../profile/CommentElement";
import { Dialog, DialogActions } from "@mui/material";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import {
  CancelButton,
  ConfirmButton,
} from "../profile/CheckDefaultProfileImgNestDialog";

const ReportedComment = () => {
  // Comment에서 쿼리해오기
  const {
    doc,
    getDocs,
    query,
    collection,
    orderBy,
    where,
    limit,
    startAfter,
    updateDoc,
  } = dbFunction;
  const [reportedComments, setReportedComments] = useState([]);
  const [nextReportCommentSnapshot, setNextReportCommentSnapshot] = useState(
    {}
  );
  const [isNextReportCommentExist, setIsNextReportCommentExist] =
    useState(false);
  const [alertInfo, setAlertInfo] = useState({
    blindComment: false,
    cancelReport: false,
  });

  const [openDialogForBlindComment, setOpenDialogForBlindComment] =
    useState(false);
  const handleClickOpenDialogForBlindComment = () => {
    setOpenDialogForBlindComment(true);
  };

  const handleCloseDialogForBlindComment = () => {
    setOpenDialogForBlindComment(false);
  };

  const onBlindComment = (currentDocId) => {
    setOpenDialogForBlindComment(false);
    onAcceptOrDenyReport(currentDocId, true);
    setAlertInfo((prev) => ({ ...prev, blindComment: true }));
    setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, blindComment: false }));
    }, 3000);
  };

  const [
    openDialogForCancelReportComment,
    setOpenDialogForCancelReportComment,
  ] = useState(false);
  const handleClickOpenDialogForCancelReportComment = () => {
    setOpenDialogForCancelReportComment(true);
  };

  const handleCloseDialogForCancelReportComment = () => {
    setOpenDialogForCancelReportComment(false);
  };

  const onCancelReportComment = (currentDocId) => {
    setOpenDialogForCancelReportComment(false);
    onAcceptOrDenyReport(currentDocId, false);
    setAlertInfo((prev) => ({ ...prev, cancelReport: true }));
    setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, cancelReport: false }));
    }, 3000);
  };

  const snapshotToReportedComments = (snapshot) => {
    if (snapshot) {
      snapshot.forEach((doc) => {
        const postObj = {
          ...doc.data(),
          id: doc.id,
        };
        setReportedComments((prev) => [...prev, postObj]);
      });
    }
  };

  const getFirstReportedComments = async () => {
    const firstSnapshot = await getDocs(
      query(
        collection(dbService, "Comment"),
        orderBy("created_timestamp", "desc"),
        where("comment_report", "==", true),
        limit(10)
      )
    );
    setNextReportCommentSnapshot(
      firstSnapshot.docs[firstSnapshot.docs.length - 1]
    );
    snapshotToReportedComments(firstSnapshot);
    if (firstSnapshot.docs.length < 10) {
      setIsNextReportCommentExist(false);
    } else {
      try {
        const nextReportsSnapshot = await getDocs(
          query(
            collection(dbService, "Comment"),
            orderBy("created_timestamp", "desc"),
            where("comment_report", "==", true),
            startAfter(firstSnapshot.docs[firstSnapshot.docs.length - 1]),
            limit(1)
          )
        );
        if (nextReportsSnapshot.docs.length === 0) {
          setIsNextReportCommentExist(false);
        } else {
          setIsNextReportCommentExist(true);
        }
      } catch (e) {
        console.log("Error with getting posts!");
      }
    }
  };
  const moveNextReportedComments = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(dbService, "Comment"),
        orderBy("created_timestamp", "desc"),
        where("comment_report", "==", true),
        startAfter(nextReportCommentSnapshot),
        limit(10)
      )
    );
    setNextReportCommentSnapshot(
      querySnapshot.docs[querySnapshot.docs.length - 1]
    );
    const afterSnapshot = await getDocs(
      query(
        collection(dbService, "Comment"),
        orderBy("created_timestamp", "desc"),
        where("comment_report", "==", true),
        startAfter(querySnapshot.docs[querySnapshot.docs.length - 1]),
        limit(1)
      )
    );
    if (afterSnapshot.docs.length === 0) {
      setIsNextReportCommentExist(false);
    } else {
      setIsNextReportCommentExist(true);
    }
    snapshotToReportedComments(querySnapshot);
  };

  const onAcceptOrDenyReport = async (commentId, isAccept) => {
    if (isAccept) {
      await updateDoc(doc(dbService, "Comment", commentId), {
        comment_rep_accept: true,
        comment_report: false,
      });
    } else {
      await updateDoc(doc(dbService, "Comment", commentId), {
        comment_report: false,
      });
    }
    setReportedComments(
      reportedComments.filter((post) => post.id !== commentId)
    );
  };

  useEffect(() => {
    getFirstReportedComments();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <NicknameTextBox success={alertInfo.blindComment} redcolor="true">
        댓글을 블라인드 했습니다.
      </NicknameTextBox>
      <NicknameTextBox success={alertInfo.cancelReport}>
        댓글 신고 접수를 취소했습니다.
      </NicknameTextBox>
      <ProfileCotentBox>
        <SectionTitle>신고된 댓글</SectionTitle>
        {reportedComments.length !== 0 ? (
          reportedComments.map((comment) => (
            <ReportPostElementBlock key={comment.id}>
              <ReportPostContentBox>
                <CommentElement
                  key={comment.id}
                  comment={comment}
                ></CommentElement>
              </ReportPostContentBox>
              <ReportPostButtonBox>
                <PostBlindButton onClick={handleClickOpenDialogForBlindComment}>
                  댓글 블라인드
                </PostBlindButton>
                <Dialog
                  open={openDialogForBlindComment}
                  onClose={handleCloseDialogForBlindComment}
                  aria-labelledby="alert-dialog-report"
                  aria-describedby="alert-dialog-report"
                >
                  <WsDialogTitle>댓글을 블라인드 하시겠습니까?</WsDialogTitle>
                  <DialogActions>
                    <ConfirmButton
                      onClick={handleCloseDialogForBlindComment}
                      color="primary"
                      autoFocus
                    >
                      취소
                    </ConfirmButton>
                    <CancelButton
                      color="primary"
                      onClick={() => onBlindComment(comment.id)}
                    >
                      블라인드
                    </CancelButton>
                  </DialogActions>
                </Dialog>
                <CancelReportButton
                  onClick={handleClickOpenDialogForCancelReportComment}
                >
                  신고 접수 취소
                </CancelReportButton>
                <Dialog
                  open={openDialogForCancelReportComment}
                  onClose={handleCloseDialogForCancelReportComment}
                  aria-labelledby="alert-dialog-reportComment"
                  aria-describedby="alert-dialog-reportComment"
                >
                  <WsDialogTitle>
                    댓글 신고 접수를 취소하시겠습니까?
                  </WsDialogTitle>
                  <DialogActions>
                    <CancelButton
                      onClick={handleCloseDialogForCancelReportComment}
                      color="primary"
                      autoFocus
                    >
                      취소
                    </CancelButton>
                    <ConfirmButton
                      color="primary"
                      onClick={() => onCancelReportComment(comment.id)}
                    >
                      신고 접수 취소
                    </ConfirmButton>
                  </DialogActions>
                </Dialog>
              </ReportPostButtonBox>
            </ReportPostElementBlock>
          ))
        ) : (
          <div>잠시만 기다려 주세요</div>
        )}
      </ProfileCotentBox>
      {isNextReportCommentExist && (
        <MoreLoadPostButton
          updatePostList={moveNextReportedComments()}
          isMarginLeft={true}
        >
          10개 더 보기
        </MoreLoadPostButton>
      )}
    </>
  );
};

export default ReportedComment;
