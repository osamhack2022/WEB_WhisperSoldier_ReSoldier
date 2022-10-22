import styled from "@emotion/styled";
import { Button, Dialog, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { dbFunction, dbService } from "../../lib/FStore";
import {
  ReportPostButtonBox,
  ReportPostContentBox,
  ReportPostElementBlock,
} from "../../styles/admin/ReportedPostStyle";
import {
  NicknameTextBox,
  SectionTitle,
} from "../../styles/profile/ChangeProfileStyle";
import { WsDialogTitle } from "../../styles/profile/CheckDefaultProfileImgDialogStyle";
import { ProfileCotentBox } from "../../styles/profile/ProfilePageStyle";
import MoreLoadPostButton from "../post/MoreLoadPostButton";
import PostElement from "../post/PostElement";
import {
  CancelButton,
  ConfirmButton,
} from "../profile/CheckDefaultProfileImgNestDialog";

export const PostBlindButton = styled(Button)({
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

export const CancelReportButton = styled(Button)({
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

const ReportedPost = () => {
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
  const [reportedPosts, setReportedPosts] = useState([]);
  const [nextReportPostSnapshot, setNextReportPostSnapshot] = useState({});
  const [isNextReportPostExist, setIsNextReportPostExist] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    blindPost: false,
    cancelReport: false,
  });

  const [openDialogForBlindPost, setOpenDialogForBlindPost] = useState(false);
  const handleClickOpenDialogForBlindPost = () => {
    setOpenDialogForBlindPost(true);
  };

  const handleCloseDialogForBlindPost = () => {
    setOpenDialogForBlindPost(false);
  };

  const onBlindPost = (currentDocId) => {
    setOpenDialogForBlindPost(false);
    onAcceptOrDenyReport(currentDocId, true);
    setAlertInfo((prev) => ({ ...prev, blindPost: true }));
    setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, blindPost: false }));
    }, 3000);
  };

  const [openDialogForCancelReportPost, setOpenDialogForCancelReportPost] =
    useState(false);
  const handleClickOpenDialogForCancelReportPost = () => {
    setOpenDialogForCancelReportPost(true);
  };

  const handleCloseDialogForCancelReportPost = () => {
    setOpenDialogForCancelReportPost(false);
  };

  const onCancelReportPost = (currentDocId) => {
    setOpenDialogForCancelReportPost(false);
    onAcceptOrDenyReport(currentDocId, false);
    setAlertInfo((prev) => ({ ...prev, cancelReport: true }));
    setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, cancelReport: false }));
    }, 3000);
  };

  const snapshotToReportedPosts = (snapshot) => {
    if (snapshot) {
      snapshot.forEach((doc) => {
        const postObj = {
          ...doc.data(),
          id: doc.id,
        };
        setReportedPosts((prev) => [...prev, postObj]);
      });
    }
  };

  const getFirstReportedPosts = async () => {
    const firstSnapshot = await getDocs(
      query(
        collection(dbService, "WorryPost"),
        orderBy("report_timestamp", "desc"),
        where("post_report", "==", true),
        limit(10)
      )
    );
    setNextReportPostSnapshot(
      firstSnapshot.docs[firstSnapshot.docs.length - 1]
    );
    snapshotToReportedPosts(firstSnapshot);
    if (firstSnapshot.docs.length < 10) {
      setIsNextReportPostExist(false);
    } else {
      try {
        const nextReportsSnapshot = await getDocs(
          query(
            collection(dbService, "WorryPost"),
            orderBy("report_timestamp", "desc"),
            where("post_report", "==", true),
            startAfter(firstSnapshot.docs[firstSnapshot.docs.length - 1]),
            limit(1)
          )
        );
        if (nextReportsSnapshot.docs.length === 0) {
          setIsNextReportPostExist(false);
        } else {
          setIsNextReportPostExist(true);
        }
      } catch (e) {
        console.log("Error with getting posts!");
      }
    }
  };
  const moveNextReportedPosts = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(dbService, "WorryPost"),
        orderBy("report_timestamp", "desc"),
        where("post_report", "==", true),
        startAfter(nextReportPostSnapshot),
        limit(10)
      )
    );
    setNextReportPostSnapshot(
      querySnapshot.docs[querySnapshot.docs.length - 1]
    );
    const afterSnapshot = await getDocs(
      query(
        collection(dbService, "WorryPost"),
        orderBy("report_timestamp", "desc"),
        where("post_report", "==", true),
        startAfter(querySnapshot.docs[querySnapshot.docs.length - 1]),
        limit(1)
      )
    );
    if (afterSnapshot.docs.length === 0) {
      setIsNextReportPostExist(false);
    } else {
      setIsNextReportPostExist(true);
    }
    snapshotToReportedPosts(querySnapshot);
  };

  const onAcceptOrDenyReport = async (documentId, isAccept) => {
    if (isAccept) {
      await updateDoc(doc(dbService, "WorryPost", documentId), {
        post_rep_accept: true,
        post_report: false,
      });
    } else {
      await updateDoc(doc(dbService, "WorryPost", documentId), {
        post_report: false,
      });
    }
    setReportedPosts(reportedPosts.filter((post) => post.id !== documentId));
  };
  useEffect(() => {
    setReportedPosts([]);
    getFirstReportedPosts();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <NicknameTextBox success={alertInfo.blindPost} redcolor="true">
        포스트를 블라인드 했습니다.
      </NicknameTextBox>
      <NicknameTextBox success={alertInfo.cancelReport}>
        포스트 신고 접수를 취소했습니다.
      </NicknameTextBox>
      <ProfileCotentBox>
        <SectionTitle>신고된 글</SectionTitle>
        {reportedPosts.length !== 0 ? (
          reportedPosts.map((document) => (
            <ReportPostElementBlock key={document.id}>
              <ReportPostContentBox>
                <PostElement post={document} admin="true"></PostElement>
              </ReportPostContentBox>

              <ReportPostButtonBox>
                <PostBlindButton onClick={handleClickOpenDialogForBlindPost}>
                  포스트 블라인드
                </PostBlindButton>
                <Dialog
                  open={openDialogForBlindPost}
                  onClose={handleCloseDialogForBlindPost}
                  aria-labelledby="alert-dialog-report"
                  aria-describedby="alert-dialog-report"
                >
                  <WsDialogTitle>포스트를 블라인드 하시겠습니까?</WsDialogTitle>
                  <DialogActions>
                    <ConfirmButton
                      onClick={handleCloseDialogForBlindPost}
                      color="primary"
                      autoFocus
                    >
                      취소
                    </ConfirmButton>
                    <CancelButton
                      color="primary"
                      onClick={() => onBlindPost(document.id)}
                    >
                      블라인드
                    </CancelButton>
                  </DialogActions>
                </Dialog>
                <CancelReportButton
                  onClick={handleClickOpenDialogForCancelReportPost}
                >
                  신고 접수 취소
                </CancelReportButton>
                <Dialog
                  open={openDialogForCancelReportPost}
                  onClose={handleCloseDialogForCancelReportPost}
                  aria-labelledby="alert-dialog-report"
                  aria-describedby="alert-dialog-report"
                >
                  <WsDialogTitle>
                    포스트 신고 접수를 취소하시겠습니까?
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
                      onClick={() => onCancelReportPost(document.id)}
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
      {isNextReportPostExist && (
        <MoreLoadPostButton
          updatePostList={moveNextReportedPosts}
          isMarginLeft={true}
        >
          10개 더 보기
        </MoreLoadPostButton>
      )}
    </>
  );
};

export default ReportedPost;
