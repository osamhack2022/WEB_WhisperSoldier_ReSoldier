import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { TabletQuery, whisperSodlierSessionKey } from "../../lib/Const";
import { authService } from "../../lib/FAuth";
import { dbFunction, dbService } from "../../lib/FStore";
import checkCurseWord from "../../modules/CheckCurseWord";
import { useAndSetForm } from "../../modules/useForm";
import { IsUpdatePostList, PostInfo } from "../../store/PostStore";
import {
  PostContentBodyBox,
  PostContentBodyContainer,
  PostContentContainerBox,
  SideButtonContainer,
} from "../../styles/PostContent/PostContentContainerStyle";
import { SideOptionContainer } from "../../styles/write/WriteContainerStyle";
import { BackButton } from "../common/Buttons";
import SideButtonBox from "../common/SideButtonBox";
import RecentPostContainer from "../container/PopularPostContainer";
import { SideOptionForm } from "../Write/WriteContainer";
import PostCommentContainer from "./PostCommentContainer";
import PostContentAlert from "./PostContentAlert";
import PostContentBody from "./PostContentBody";
import PostContentTitle from "./PostContentTiltle";
import {
  OtherUserButtonContainer,
  WriteUserButtonContainer,
} from "./SideButtonContainer";

const PostContentContainer = ({ isAdmin }) => {
  const isTablet = useMediaQuery({ query: TabletQuery });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const {
    doc,
    updateDoc,
    collection,
    getDocs,
    getDoc,
    query,
    where,
    increment,
    addDoc,
  } = dbFunction;

  const [postInfo, setPostInfo] = useRecoilState(PostInfo);
  const setIsUpdatePostList = useSetRecoilState(IsUpdatePostList);

  const location = useLocation();
  // console.log(location);

  const [state, setState, onChange] = useAndSetForm({
    editContent: postInfo.postContent,
    comment: "",
    editTag: postInfo.tag_name,
  });

  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [errorPostInfo, setErrorPostInfo] = useState(false);
  const [errorEditInfo, setErrorEditInfo] = useState(false);

  const [isLikedByMe, setIsLikedByMe] = useState(false);

  const [postUserNickname, setPostUserNickname] = useState("");
  const [postUserProfileImg, setPostUserProfileImg] = useState("");

  const [alertInfo, setAlertInfo] = useState({
    editPost: false,
    addLikePost: false,
    subLikePost: false,
    createComment: false,
    editComment: false,
    deleteComment: false,
    addLikeComment: false,
    subComment: false,
    reportPost: false,
    reportComment: false,
  });

  const getIsLiked = async (currentPostInfo = null) => {
    const { uid: currentUserUid } = JSON.parse(
      sessionStorage.getItem(whisperSodlierSessionKey)
    );

    if (!currentPostInfo) {
      currentPostInfo = postInfo.id;
    }

    const likeCheckQuery = query(
      collection(dbService, "PostLike"),
      where("associated_post_id", "==", currentPostInfo),
      where("user_id", "==", currentUserUid)
    );

    const querySnapshot = await getDocs(likeCheckQuery);
    if (querySnapshot.docs.length === 0) {
      setIsLikedByMe(false);
    } else {
      setIsLikedByMe(true);
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onEditPostClick = async () => {
    await updateDoc(doc(dbService, "WorryPost", postInfo.id), {
      text: state.editContent,
      tag_name: state.editTag.replace(/ /g, ""),
    });
    const currentTag = postInfo.tag_name;
    const nextTag = state.editTag.replace(/ /g, "");

    if (nextTag !== currentTag) {
      if (currentTag.length !== 0) {
        const oldtagSnap = await getDocs(
          query(
            collection(dbService, "Tag"),
            where("tag_name", "==", postInfo.tag_name)
          )
        );
        updateDoc(doc(dbService, "Tag", oldtagSnap.docs[0].id), {
          tag_count: increment(-1),
        });
      }

      if (nextTag.length !== 0) {
        const nextTagSnap = await getDocs(
          query(collection(dbService, "Tag"), where("tag_name", "==", nextTag))
        );
        if (nextTagSnap.docs.length === 0) {
          await addDoc(collection(dbService, "Tag"), {
            tag_count: 1,
            tag_name: nextTag,
          });
        } else {
          await updateDoc(doc(dbService, "Tag", nextTagSnap.docs[0].id), {
            tag_count: increment(1),
          });
        }
      }
    }

    setPostInfo((prev) => ({
      ...prev,
      postContent: state.editContent,
      tag_name: nextTag,
    }));

    setEditing(false);

    setIsUpdatePostList((prev) => ({
      ...prev,
      searchPage: true,
      newestPage: true,
      popularPage: true,
    }));

    setAlertInfo((prev) => ({ ...prev, editPost: true }));
    setTimeout(
      () => setAlertInfo((prev) => ({ ...prev, editPost: false })),
      3000
    );
  };

  const getPostUserNickname = async (refreshData = null) => {
    let userDoc;
    if (refreshData) {
      userDoc = await getDoc(doc(dbService, "User", refreshData.creator_id));
    } else {
      userDoc = await getDoc(doc(dbService, "User", postInfo.creator_id));
    }

    if (userDoc.data()) {
      setPostUserNickname(userDoc.data().nickname);
      setPostUserProfileImg(userDoc.data().profileImg);
    }
  };

  /*새로고침시 전역 상태 정보가 날라가는 현상으로 인한 오류 발생을 막기 위한 함수*/
  const getContent = async () => {
    const docRef = doc(dbService, "WorryPost", id);
    const docSnapShot = await getDoc(docRef);
    if (docSnapShot.exists()) {
      const contentObj = {
        ...docSnapShot.data(),
        id,
      };
      setPostInfo((prev) => ({
        ...prev,
        creator_id: contentObj.creator_id,
        created_timestamp: contentObj.created_timestamp
          .toDate()
          .toLocaleString(),
        id: contentObj.id,
        like_count: contentObj.like_count,
        post_rep_accept: contentObj.post_rep_accept,
        post_report: contentObj.post_report,
        postContent: contentObj.text,
        comment_count: contentObj.comment_count,
        tag_name: contentObj.tag_name,
        post_report: contentObj.post_report,
        post_rep_accept: contentObj.post_rep_accept,
      }));
      setState((prev) => ({
        ...prev,
        editContent: contentObj.text,
        editTag: contentObj.tag_name,
      }));
      getIsLiked(contentObj.id);
      getPostUserNickname(contentObj);
    } else {
      setErrorPostInfo(true);
      console.log("No such Document!");
    }
  };

  // useEffect(() => {
  //   if (postInfo.created_timestamp === null) {
  //     getContent();
  //   } else {
  //     getIsLiked();
  //     getPostUserNickname();
  //   }
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    if (postInfo.created_timestamp === null) {
      getContent();
    } else {
      getIsLiked();
      getPostUserNickname();
    }
    // eslint-disable-next-line
  }, [postInfo]);

  useEffect(() => {
    if (postInfo.id !== id) {
      getContent();
    }
    //eslint-disable-next-line
  }, [location]);

  return (
    <PostContentContainerBox>
      <PostContentAlert alertInfo={alertInfo} />
      <PostContentBodyContainer>
        <SideButtonContainer>
          <SideButtonBox>
            <BackButton goBack={goBack} isMobile={isTablet ? "false" : "true"}>
              뒤로가기
            </BackButton>
            {!isAdmin &&
              postInfo.created_timestamp &&
              authService.currentUser &&
              !postInfo.post_rep_accept &&
              (authService.currentUser.uid === postInfo.creator_id ? (
                <WriteUserButtonContainer
                  editing={editing}
                  postInfo={postInfo}
                  toggleEditing={toggleEditing}
                  isMobile={isTablet ? "false" : "true"}
                ></WriteUserButtonContainer>
              ) : (
                <OtherUserButtonContainer
                  isMobile={isTablet ? "false" : "true"}
                  isLikedByMe={isLikedByMe}
                  setIsLikedByMe={setIsLikedByMe}
                  postInfo={postInfo}
                  setPostInfo={setPostInfo}
                  setAlertInfo={setAlertInfo}
                  postUserNickname={postUserNickname}
                ></OtherUserButtonContainer>
              ))}
          </SideButtonBox>
        </SideButtonContainer>

        <PostContentBodyBox>
          <PostContentTitle
            editing={editing}
            postInfo={postInfo}
            errorPostInfo={errorPostInfo}
            postUserNickname={postUserNickname}
            postUserProfileImg={postUserProfileImg}
            onClick={onEditPostClick}
            errorEditInfo={errorEditInfo}
            state={state}
            setErrorEditInfo={setErrorEditInfo}
          ></PostContentTitle>
          <PostContentBody
            postInfo={postInfo}
            state={state}
            onChange={onChange}
            editing={editing}
            isMyLike={isLikedByMe}
            errorPostInfo={errorPostInfo}
          ></PostContentBody>
        </PostContentBodyBox>

        {postInfo.created_timestamp && !editing && (
          <PostCommentContainer
            postInfo={postInfo}
            state={state}
            setState={setState}
            onChange={onChange}
            isTablet={isTablet}
            isAdmin={isAdmin}
            setAlertInfo={setAlertInfo}
          ></PostCommentContainer>
        )}
      </PostContentBodyContainer>
      <SideOptionContainer>
        {postInfo.created_timestamp ? (
          editing ? (
            <SideOptionForm />
          ) : (
            <RecentPostContainer />
          )
        ) : (
          <></>
        )}
      </SideOptionContainer>
    </PostContentContainerBox>
  );
};

export default PostContentContainer;
