import { useEffect, useState } from "react";
import { dbFunction, dbService } from "../../lib/FStore";
import {
  NicknameTextBox,
  SectionTitle,
} from "../../styles/profile/ChangeProfileStyle";
import { ProfileCotentBox } from "../../styles/profile/ProfilePageStyle";
import MoreLoadPostButton from "../post/MoreLoadPostButton";
import {
  InfoTextBox,
  ReportPostButtonBox,
  ReportPostContentBox,
  ReportPostElementBlock,
} from "../../styles/admin/ReportedPostStyle";
import CommentElement from "../profile/CommentElement";
import BlindDialog from "./BlindDialog";
import CancelReportDialog from "./CancelReportDialog";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isNonExistReport, setIsNonExistReport] = useState(false);
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
        orderBy("report_timestamp", "desc"),
        where("comment_report", "==", true),
        limit(10)
      )
    );
    setNextReportCommentSnapshot(
      firstSnapshot.docs[firstSnapshot.docs.length - 1]
    );
    snapshotToReportedComments(firstSnapshot);
    if (firstSnapshot.docs.length === 0) {
      setIsNonExistReport(true);
    } else if (firstSnapshot.docs.length < 10) {
      setIsNextReportCommentExist(false);
    } else {
      try {
        const nextReportsSnapshot = await getDocs(
          query(
            collection(dbService, "Comment"),
            orderBy("report_timestamp", "desc"),
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
    setIsLoading(false);
  };

  const moveNextReportedComments = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(dbService, "Comment"),
        orderBy("report_timestamp", "desc"),
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
        orderBy("report_timestamp", "desc"),
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
    setReportedComments([]);
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
        {isLoading ? (
          <InfoTextBox>잠시만 기다려 주세요</InfoTextBox>
        ) : isNonExistReport || reportedComments.length === 0 ? (
          <InfoTextBox>신고된 댓글이 존재하지 않습니다.</InfoTextBox>
        ) : (
          reportedComments.map((comment) => (
            <ReportPostElementBlock key={comment.id}>
              <ReportPostContentBox>
                <CommentElement
                  key={comment.id}
                  comment={comment}
                ></CommentElement>
              </ReportPostContentBox>
              <ReportPostButtonBox>
                <BlindDialog
                  onAcceptOrDenyReport={onAcceptOrDenyReport}
                  setAlertInfo={setAlertInfo}
                  document={comment}
                  isComment="true"
                />
                <CancelReportDialog
                  onAcceptOrDenyReport={onAcceptOrDenyReport}
                  setAlertInfo={setAlertInfo}
                  document={comment}
                  isComment="true"
                />
              </ReportPostButtonBox>
            </ReportPostElementBlock>
          ))
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
