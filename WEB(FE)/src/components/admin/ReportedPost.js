import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbFunction, dbService } from "../../lib/FStore";
import getTimeDepth from "../../modules/GetTimeDepth";
import { SideOptionContainer } from "../../styles/post/PostBoardStyle";
import { ProfileCotentBox } from "../../styles/profile/ProfilePageStyle";
import { SideOptionFormForPostBoard } from "../common/SideOptionForm";

const ReportedPost = () => {
  // WorryPost에서 쿼리해오기
  const { doc, getDocs, query, collection, orderBy, where, limit, startAfter, updateDoc } = dbFunction;
  const [reportedPosts, setReportedPosts] = useState([]);
  const [nextReportPostSnapshot, setNextReportPostSnapshot] = useState({});
  const [isNextReportPostExist, setIsNextReportPostExist] = useState(false);
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

  const getFirstReportedPosts = async (descOrAsc="desc", timeDepthString="week") => {
    const firstSnapshot = await getDocs(
      query(collection(dbService, "WorryPost"),
				orderBy("created_timestamp", descOrAsc),
        where("post_report", "==", true),
        where("created_timestamp", ">=", getTimeDepth(timeDepthString)),
				limit(10),
			)
    );
    setNextReportPostSnapshot(firstSnapshot.docs[firstSnapshot.docs.length - 1]);
    snapshotToReportedPosts(firstSnapshot);
    if (firstSnapshot.docs.length < 10) {
      setIsNextReportPostExist(false);
    } else {
      try {
        const nextReportsSnapshot = await getDocs(
          query(collection(dbService, "WorryPost"),
          orderBy("created_timestamp", descOrAsc),
          where("post_report", "==", true),
          where("created_timestamp", ">=", getTimeDepth(timeDepthString)),
          startAfter(firstSnapshot.docs[firstSnapshot.docs.length - 1]),
          limit(1),
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
  }
  const moveNextReportedPosts = async (descOrAsc, timeDepthString) => {
    const querySnapshot = await getDocs(
      query(
        collection(dbService, "WorryPost"),
        orderBy("created_timestamp", descOrAsc),
        where("post_report", "==", true),
        where("created_timestamp", ">=", getTimeDepth(timeDepthString)),
        startAfter(nextReportPostSnapshot),
        limit(10)
      )
    );
    setNextReportPostSnapshot(querySnapshot.docs[querySnapshot.docs.length - 1]);
    const afterSnapshot = await getDocs(
      query(
        collection(dbService, "WorryPost"),
        orderBy("created_timestamp", descOrAsc),
        where("post_report", "==", true),
        where("created_timestamp", ">=", getTimeDepth(timeDepthString)),
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
  const onSearchSubmit = async (e) => {
    e.preventDefault();
    setReportedPosts([]);
    getFirstReportedPosts(orderDescOrAsc, timeDepthValue);
  };
  const onAcceptOrDenyReport = async (documentId, isAccept) => {
    if (isAccept) {
      await updateDoc(doc(dbService, "WorryPost", documentId), {
        post_rep_accept: true,
        //블라인드를 해줄 때 post_report를 false로 해준 이유는 
        //한 번 블라인드 처리를 한 Post는 더이상 관리자 페이지에 안 뜨게 하도록 하기 위함
        post_report: false,
      })
    } else {
      await updateDoc(doc(dbService, "WorryPost", documentId), {
        post_report: false,
      })
    }
    setReportedPosts(reportedPosts.filter((post) => (post.id !== documentId)));
    console.log("acceptOrDenyPostId: ", documentId);
  }
  useEffect(() => {
    getFirstReportedPosts();
  }, []);
  return (
    <ProfileCotentBox>
      신고된 글
      {reportedPosts.length !== 0 ? (
        reportedPosts.map((document) => (
          <div
            key={document.id}
          >
            <Link to={`/post/${document.id}`}>
            {document.text} #{document.tag_name}
            </Link>
            <button onClick={() => onAcceptOrDenyReport(document.id, true)}>블라인드하기</button>
            <button onClick={() => onAcceptOrDenyReport(document.id, false)}>무시하기</button>
          </div>
        ))
      ) : (
        <div>잠시만 기다려 주세요</div>
      )}
      {isNextReportPostExist && <button onClick={() => moveNextReportedPosts(orderDescOrAsc, timeDepthValue)}>10개 더 보기</button>}
      
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

export default ReportedPost;
