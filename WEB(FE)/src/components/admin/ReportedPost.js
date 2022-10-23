import { useEffect, useState } from "react";
import { dbFunction, dbService } from "../../lib/FStore";
import {
  InfoTextBox,
  ReportPostButtonBox,
  ReportPostContentBox,
  ReportPostElementBlock,
} from "../../styles/admin/ReportedPostStyle";
import {
  NicknameTextBox,
  SectionTitle,
} from "../../styles/profile/ChangeProfileStyle";
import { ProfileCotentBox } from "../../styles/profile/ProfilePageStyle";
import MoreLoadPostButton from "../post/MoreLoadPostButton";
import PostElement from "../post/PostElement";
import BlindDialog from "./BlindDialog";
import CancelReportDialog from "./CancelReportDialog";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isNonExistReport, setIsNonExistReport] = useState(false);
  const [reportedPosts, setReportedPosts] = useState([]);
  const [nextReportPostSnapshot, setNextReportPostSnapshot] = useState({});
  const [isNextReportPostExist, setIsNextReportPostExist] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    blindPost: false,
    cancelReport: false,
  });

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
    if (firstSnapshot.docs.length === 0) {
      setIsNonExistReport(true);
    } else if (firstSnapshot.docs.length < 10) {
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
    setIsLoading(false);
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
        {isLoading ? (
          <InfoTextBox>잠시만 기다려 주세요</InfoTextBox>
        ) : isNonExistReport || reportedPosts.length === 0 ? (
          <InfoTextBox>신고된 포스트가 존재하지 않습니다.</InfoTextBox>
        ) : (
          reportedPosts.map((document) => (
            <ReportPostElementBlock key={document.id}>
              <ReportPostContentBox>
                <PostElement post={document} admin="true"></PostElement>
              </ReportPostContentBox>

              <ReportPostButtonBox>
                <BlindDialog
                  onAcceptOrDenyReport={onAcceptOrDenyReport}
                  setAlertInfo={setAlertInfo}
                  document={document}
                />
                <CancelReportDialog
                  onAcceptOrDenyReport={onAcceptOrDenyReport}
                  setAlertInfo={setAlertInfo}
                  document={document}
                />
              </ReportPostButtonBox>
            </ReportPostElementBlock>
          ))
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
