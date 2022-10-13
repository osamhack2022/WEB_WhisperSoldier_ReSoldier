import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { authService } from "../../lib/FAuth";
import { dbFunction, dbService } from "../../lib/FStore";
import { updateProfile } from "firebase/auth";
import {
  DeletePostButton,
  EditPostButton,
  LikeButton,
  PostChatButton,
  ReportButton,
} from "../common/Buttons";

export const WriteUserButtonContainer = ({
  onDeleteClick,
  toggleEditing,
  editing,
  isMobile,
}) => {
  return (
    <>
      <EditPostButton
        toggleEditing={toggleEditing}
        editing={editing}
        isMobile={isMobile}
      ></EditPostButton>
      {!editing && (
        <DeletePostButton
          onDeleteClick={onDeleteClick}
          isMobile={isMobile}
        ></DeletePostButton>
      )}
    </>
  );
};

export const OtherUserButtonContainer = ({
  isMobile,
  toggleLike,
  isLikedByMe,
  postInfo,
  onClickChatButton,
}) => {
  const navigate = useNavigate();
  
  // displayName의 실존 여부를 확인하기 위한 코드
  /* const user = authService.currentUser;
  if (user !== null) {
    const displayName = user.displayName;
    console.log("NOT NULL and DisplayName is : ", displayName);
    console.log(user.email, user.photoURL, user.emailVerified);
  } else {
    console.log("USER IS NULL")
  } */
  const onClickChatButtonFromPost = async (e) => {
    const { uid: currentUserUid,
      displayName: currentUserDisplayName,
    } = JSON.parse(
      sessionStorage.getItem(whisperSodlierSessionKey)
    );
    e.preventDefault();
    //아직은 따로 설정을 안해줘서 undefined인 모양이다
    console.log("currentUserDisplayName: ", currentUserDisplayName)
    const { query, collection, getDocs, where, addDoc, serverTimestamp } = dbFunction;
    //채팅방이 이미 존재하는지 체크하기image.png
    console.log("postInfo is from onclickChatButtonFromPost :", postInfo.creator_id)
    let checkQuery;
    if (postInfo.creator_id <= currentUserUid) {
      checkQuery = query(collection(dbService, "ChatPair"),
      where("member_ids", "==", [postInfo.creator_id, currentUserUid]),
    )
    } else {
      checkQuery = query(collection(dbService, "ChatPair"),
      where("member_ids", "==", [currentUserUid, postInfo.creator_id]),
    )
    }
    const checkSnapshot = await getDocs(checkQuery)
    /* if (checkSnapshot.docs.length === 0) {
      //만약 없다면, 새로 만들기
      console.log("찾은 개수 0. 채팅방을 생성하기");
      await addDoc(collection(dbService, "ChatPair"), {
        created_timestamp: serverTimestamp(),
        is_report_and_block: false,
        member_ids: ((postInfo.creator_id <= currentUserUid) ? [postInfo.creator_id, currentUserUid] : [currentUserUid, postInfo.creator_id]),
        members: [
          {
            member_displayname: "",
            member_id: "",
          },
          {
            member_displayname: "",
            member_id: "",
          }
        ],
        recentMessage: {},
      });
    } else {
      //있다면, 일단 채팅페이지로 navigate
      console.log("찾았음! chatPage로 내비게이트");
      navigate("/message");
    } */
  };
  
  return (
    <>
      <LikeButton
        toggleLike={toggleLike}
        isMobile={isMobile}
        isLikedByMe={isLikedByMe}
      ></LikeButton>

      <PostChatButton /* toLink="/" */ isMobile={isMobile} onClickChatButtonFromPost={onClickChatButtonFromPost} onClickChatButton={onClickChatButton}>
        채팅하기
      </PostChatButton>
      <ReportButton toLink="/" isMobile={isMobile}>
        신고하기
      </ReportButton>
    </>
  );
};
