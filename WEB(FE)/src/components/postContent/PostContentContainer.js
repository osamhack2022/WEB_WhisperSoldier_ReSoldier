import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { TabletQuery, whisperSodlierSessionKey } from "../../lib/Const";
import { authService } from "../../lib/FAuth";
import { dbFunction, dbService } from "../../lib/FStore";
import { useAndSetForm } from "../../modules/useForm";
import { IsUpdatePostList, PostInfo } from "../../store/PostStore";
import {
  PostContentBodyContainer,
  PostContentContainerBox,
  SideButtonContainer,
} from "../../styles/PostContent/PostContentContainerStyle";
import { SideOptionContainer } from "../../styles/write/WriteContainerStyle";
import { BackButton } from "../common/Buttons";
import SideButtonBox from "../common/SideButtonBox";
import PopularPostContainer from "../container/PopularPostContainer";
import RecommandTagContainer from "../container/RecommandTagContainer";
import InputTagContainer from "./InputTageContainer";
import PostCommentContainer from "./PostCommentContainer";
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

  const onClick = async (e) => {
    e.preventDefault();
    if (state.editContent.length === 0) {
      setErrorEditInfo(true);
      setTimeout(() => {
        setErrorEditInfo(false);
      }, 3000);
    } else {
      const check = window.confirm("정말로 수정하시겠습니까?");
      if (check) {
        await updateDoc(doc(dbService, "WorryPost", postInfo.id), {
          text: state.editContent,
          tag_name: state.editTag,
        })
          .then(
            setPostInfo((prev) => ({
              ...prev,
              postContent: state.editContent,
              tag_name: state.editTag,
            }))
          )
          .then(alert("수정되었습니다."))
          .then(setEditing(false));

        const oldtagSnap = await getDocs(
          query(
            collection(dbService, "Tag"),
            where("tag_name", "==", postInfo.tag_name)
          )
        );
        if (oldtagSnap.docs.length === 0) {
          console.log("Could not find Old Tag");
        } else {
          updateDoc(doc(dbService, "Tag", oldtagSnap.docs[0].id), {
            tag_count: increment(-1),
          });
          console.log(
            "Old Tag count incremented by -1 as the tag EXISTS in collection"
          );
        }

        if (state.editTag !== "") {
          const newTagSnap = await getDocs(
            query(
              collection(dbService, "Tag"),
              where("tag_name", "==", state.editTag)
            )
          );
          if (newTagSnap.docs.length === 0) {
            const tagDocRef = await addDoc(collection(dbService, "Tag"), {
              tag_count: 1,
              tag_name: state.editTag,
            });
            console.log("Tag added to collection with ID: ", tagDocRef.id);
          } else {
            updateDoc(doc(dbService, "Tag", newTagSnap.docs[0].id), {
              tag_count: increment(1),
            });
            console.log(
              "Tag count incremented by 1 as the tag EXISTS in collection"
            );
          }
        }

        setIsUpdatePostList((prev) => ({
          ...prev,
          searchPage: true,
          newestPage: true,
          popularPage: true,
        }));
      }
    }
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

  useEffect(() => {
    if (postInfo.created_timestamp === null) {
      getContent();
    } else {
      getIsLiked();
      getPostUserNickname();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <PostContentContainerBox>
      <SideButtonContainer>
        <SideButtonBox>
          <BackButton goBack={goBack} isMobile={isTablet ? "false" : "true"}>
            뒤로가기
          </BackButton>
          {!isAdmin &&
            !isTablet &&
            postInfo.created_timestamp &&
            authService.currentUser &&
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
              ></OtherUserButtonContainer>
            ))}
        </SideButtonBox>

        {!isAdmin && isTablet && postInfo.created_timestamp ? (
          <SideButtonBox isNotTop={true}>
            {authService.currentUser ? (
              authService.currentUser.uid === postInfo.creator_id ? (
                <WriteUserButtonContainer
                  editing={editing}
                  postInfo={postInfo}
                  toggleEditing={toggleEditing}
                ></WriteUserButtonContainer>
              ) : (
                <OtherUserButtonContainer
                  postInfo={postInfo}
                  isLikedByMe={isLikedByMe}
                  setPostInfo={setPostInfo}
                  setIsLikedByMe={setIsLikedByMe}
                ></OtherUserButtonContainer>
              )
            ) : (
              <></>
            )}
          </SideButtonBox>
        ) : (
          <></>
        )}
      </SideButtonContainer>
      <PostContentBodyContainer>
        <PostContentTitle
          postInfo={postInfo}
          errorPostInfo={errorPostInfo}
          isMyLike={isLikedByMe}
          postUserNickname={postUserNickname}
          postUserProfileImg={postUserProfileImg}
        ></PostContentTitle>
        <PostContentBody
          postInfo={postInfo}
          state={state}
          onChange={onChange}
          editing={editing}
          onClick={onClick}
          errorPostInfo={errorPostInfo}
          errorEditInfo={errorEditInfo}
        ></PostContentBody>
        {postInfo.created_timestamp && !editing && (
          <PostCommentContainer
            postInfo={postInfo}
            state={state}
            setState={setState}
            onChange={onChange}
            isTablet={isTablet}
            isAdmin={isAdmin}
          ></PostCommentContainer>
        )}
      </PostContentBodyContainer>
      <SideOptionContainer>
        {postInfo.created_timestamp ? (
          editing ? (
            <>
              <InputTagContainer></InputTagContainer>
              <RecommandTagContainer></RecommandTagContainer>
            </>
          ) : (
            <PopularPostContainer></PopularPostContainer>
          )
        ) : (
          <></>
        )}
      </SideOptionContainer>
    </PostContentContainerBox>
  );
};

export default PostContentContainer;
