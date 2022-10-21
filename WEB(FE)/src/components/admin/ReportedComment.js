import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbFunction, dbService } from "../../lib/FStore";
import getTimeDepth from "../../modules/GetTimeDepth";
import { SideOptionContainer } from "../../styles/post/PostBoardStyle";
import { ProfileCotentBox } from "../../styles/profile/ProfilePageStyle";
import { SideOptionFormForPostBoard } from "../common/SideOptionForm";

const ReportedComment = () => {
  // Comment에서 쿼리해오기
  const { doc, getDocs, query, collection, orderBy, where, limit, startAfter, updateDoc } = dbFunction;
  const [reportedComments, setReportedComments] = useState([]);
  const [nextReportCommentSnapshot, setNextReportCommentSnapshot] = useState({});
  const [isNextReportCommentExist, setIsNextReportCommentExist] = useState(false);
  const [timeDepthValue, setTimeDepthValue] = useState("week");
  const [timeDepthSelect, setTimeDepthSelect] = useState({
    week: true,
    month: false,
    halfYear: false,
    fullYear: false,
    allTime: false,
  });
  const [isResultDesc, setIsResultDesc] = useState(true);
  const [orderDescOrAsc, setOrderDescOrAsc] = useState("desc");
  
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

  const getFirstReportedComments = async (descOrAsc="desc", timeDepthString="week") => {
    const firstSnapshot = await getDocs(
      query(collection(dbService, "Comment"),
				orderBy("created_timestamp", descOrAsc),
        where("comment_report", "==", true),
        where("created_timestamp", ">=", getTimeDepth(timeDepthString)),
				limit(10),
			)
    );
    setNextReportCommentSnapshot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
    snapshotToReportedComments(firstSnapshot);
    if (firstSnapshot.docs.length < 10) {
      setIsNextReportCommentExist(false);
    } else {
      try {
        const nextReportsSnapshot = await getDocs(
          query(collection(dbService, "Comment"),
          orderBy("created_timestamp", descOrAsc),
          where("comment_report", "==", true),
          where("created_timestamp", ">=", getTimeDepth(timeDepthString)),
          startAfter(firstSnapshot.docs[firstSnapshot.docs.length - 1]),
          limit(1),
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
  }
  const moveNextReportedComments = async (descOrAsc, timeDepthString) => {
    const querySnapshot = await getDocs(
      query(
        collection(dbService, "Comment"),
        orderBy("created_timestamp", descOrAsc),
        where("comment_report", "==", true),
        where("created_timestamp", ">=", getTimeDepth(timeDepthString)),
        startAfter(nextReportCommentSnapshot),
        limit(10)
      )
    );
    setNextReportCommentSnapshot(querySnapshot.docs[querySnapshot.docs.length - 1]);
    const afterSnapshot = await getDocs(
      query(
        collection(dbService, "Comment"),
        orderBy("created_timestamp", descOrAsc),
        where("comment_report", "==", true),
        where("created_timestamp", ">=", getTimeDepth(timeDepthString)),
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
  const onSearchSubmit = async (e) => {
    e.preventDefault();
    setReportedComments([]);
    getFirstReportedComments(orderDescOrAsc, timeDepthValue);
  };
  const onAcceptOrDenyReport = async (commentId, isAccept) => {
    if (isAccept) {
      await updateDoc(doc(dbService, "Comment", commentId), {
        comment_rep_accept: true,
        comment_report: false,
      })
    } else {
      await updateDoc(doc(dbService, "Comment", commentId), {
        comment_report: false,
      })
    }
    setReportedComments(reportedComments.filter((post) => (post.id !== commentId)));
    console.log("acceptOrDenyPostId: ", commentId);
  }
  useEffect(() => {
    getFirstReportedComments();
  }, []);
  return (
    <ProfileCotentBox>
      신고된 댓글
      {reportedComments.length !== 0 ? (
        reportedComments.map((comment) => (
          <div
            key={comment.id}
          >
            <Link to={`/post/${comment.associated_post_id}`}>
            {comment.comment_text}
            </Link>
            <button onClick={() => onAcceptOrDenyReport(comment.id, true)}>블라인드하기</button>
            <button onClick={() => onAcceptOrDenyReport(comment.id, false)}>무시하기</button>
          </div>
        ))
      ) : (
        <div>잠시만 기다려 주세요</div>
      )}
      {isNextReportCommentExist && <button onClick={() => moveNextReportedComments(orderDescOrAsc, timeDepthValue)}>10개 더 보기</button>}
      
      <SideOptionContainer>
        <SideOptionFormForPostBoard
          onSearchSubmit={onSearchSubmit}
          setTimeDepthValue={setTimeDepthValue}
          timeDepthSelect={timeDepthSelect}
          setTimeDepthSelect={setTimeDepthSelect}
          isResultDesc={isResultDesc}
          setIsResultDesc={setIsResultDesc}
          setOrderDescOrAsc={setOrderDescOrAsc}
        ></SideOptionFormForPostBoard>
      </SideOptionContainer>
    </ProfileCotentBox>);
};

export default ReportedComment;
