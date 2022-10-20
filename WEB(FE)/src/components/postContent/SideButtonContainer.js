import { useNavigate } from "react-router-dom";
import { whisperSodlierSessionKey } from "../../lib/Const";
import { dbFunction, dbService } from "../../lib/FStore";
import {
  DeletePostButton,
  EditPostButton,
  LikeButton,
  PostChatButton,
  ReportButton,
} from "../common/Buttons";
import { useSetRecoilState } from "recoil";
import { IsUpdatePostList } from "../../store/PostStore";
import { StartFirstChat } from "../../store/ChatStore";

export const WriteUserButtonContainer = ({
  toggleEditing,
  editing,
  isMobile,
  postInfo,
}) => {
  const {
    doc,
    deleteDoc,
    collection,
    getDocs,
    orderBy,
    query,
    where,
    updateDoc,
    increment,
  } = dbFunction;

  const setIsUpdatePostList = useSetRecoilState(IsUpdatePostList);
  const navigate = useNavigate();
  const onDeleteClick = async (e) => {
    const check = window.confirm("정말로 글을 삭제하시겠습니까?");
    if (check) {
      console.log(`deleting ${postInfo.id}`);
      await deleteDoc(doc(dbService, "WorryPost", postInfo.id)).then(
        alert("글이 삭제되었습니다.")
      );

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

      /*삭제된 post 내 속한 댓글 삭제 */
      const querySnapshot = await getDocs(
        query(
          collection(dbService, "Comment"),
          where("associated_post_id", "==", postInfo.id),
          orderBy("created_timestamp", "desc")
        )
      );
      querySnapshot.forEach((comment) => {
        deleteDoc(doc(dbService, "Comment", comment.id));
      });

      /* 삭제된 post의 공감 삭제 */
      const queryLikeSnapshot = await getDocs(
        query(
          collection(dbService, "PostLike"),
          where("associated_post_id", "==", postInfo.id),
          orderBy("created_timestamp", "desc")
        )
      );
      queryLikeSnapshot.forEach((like) => {
        deleteDoc(doc(dbService, "PostLike", like.id));
      });

      const queryCommentLikeSnapshot = await getDocs(
        query(
          collection(dbService, "CommentLike"),
          where("associated_comment_id", "==", postInfo.id),
          orderBy("created_timestamp", "desc")
        )
      );
      queryCommentLikeSnapshot.forEach((like) => {
        deleteDoc(doc(dbService, "CommentLike", like.id));
      });

      setIsUpdatePostList((prev) => ({
        ...prev,
        searchPage: true,
        newestPage: true,
        popularPage: true,
      }));
      navigate("/");
    }
  };
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
  isLikedByMe,
  postInfo,
  setPostInfo,
  setIsLikedByMe,
}) => {
  const navigate = useNavigate();
  const {
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    collection,
    getDocs,
    query,
    where,
    serverTimestamp,
  } = dbFunction;

  const setIsUpdatePostList = useSetRecoilState(IsUpdatePostList);
  const setStartFirstChat = useSetRecoilState(StartFirstChat);

  const toggleLike = async () => {
    const { uid: currentUserUid } = JSON.parse(
      sessionStorage.getItem(whisperSodlierSessionKey)
    );
    const postDocRef = doc(dbService, "WorryPost", postInfo.id);
    console.log(postDocRef);
    if (isLikedByMe) {
      const likeCheckQuery = query(
        collection(dbService, "PostLike"),
        where("associated_post_id", "==", postInfo.id),
        where("user_id", "==", currentUserUid)
      );
      const querySnapshot = await getDocs(likeCheckQuery);
      if (querySnapshot.docs.length === 0) {
        console.log("you have not liked this yet.");
      } else {
        querySnapshot.forEach((like) => {
          deleteDoc(doc(dbService, "PostLike", like.id));
        });
      }
      await updateDoc(postDocRef, {
        like_count: postInfo.like_count - 1,
      }).then(
        setPostInfo((prev) => ({
          ...prev,
          like_count: postInfo.like_count - 1,
        }))
      );
      setIsLikedByMe(false);
      console.log("Subtracted");
    } else {
      await updateDoc(postDocRef, {
        like_count: postInfo.like_count + 1,
      }).then(
        setPostInfo((prev) => ({
          ...prev,
          like_count: postInfo.like_count + 1,
        }))
      );
      await addDoc(collection(dbService, "PostLike"), {
        associated_post_id: postInfo.id,
        user_id: currentUserUid,
        created_timestamp: serverTimestamp(),
      }).then(setIsLikedByMe(true));
      console.log("Added");
      console.log(postInfo.id);
    }
    setIsUpdatePostList((prev) => ({
      ...prev,
      searchPage: true,
      newestPage: true,
      popularPage: true,
    }));
  };

  const onClickChatButtonFromPost = async (e) => {
    const { uid: currentUserUid } = JSON.parse(
      sessionStorage.getItem(whisperSodlierSessionKey)
    );
    e.preventDefault();
    //아직은 따로 설정을 안해줘서 undefined인 모양이다 -> 원래 uid로 조회가 안되는듯!

    //채팅방이 이미 존재하는지 체크하기
    let checkQuery;
    if (postInfo.creator_id <= currentUserUid) {
      checkQuery = query(
        collection(dbService, "ChatPair"),
        where("member_ids", "==", [postInfo.creator_id, currentUserUid])
      );
    } else {
      checkQuery = query(
        collection(dbService, "ChatPair"),
        where("member_ids", "==", [currentUserUid, postInfo.creator_id])
      );
    }
    const checkSnapshot = await getDocs(checkQuery);
    if (checkSnapshot.docs.length === 0) {
      const newChatRef = await addDoc(collection(dbService, "ChatPair"), {
        created_timestamp: serverTimestamp(),
        is_report_and_block: "",
        member_ids:
          postInfo.creator_id <= currentUserUid
            ? [postInfo.creator_id, currentUserUid]
            : [currentUserUid, postInfo.creator_id],
        recentMessage: {
          message_text: null,
          read_by: [],
          sent_by: null,
          sent_timestamp: serverTimestamp(),
        },
      });
      setStartFirstChat((prev) => ({
        ...prev,
        exist: true,
        docUID: newChatRef.id,
      }));
      navigate("/message");
    } else {
      console.log("기존 채팅방 존재");
      setStartFirstChat((prev) => ({
        ...prev,
        exist: true,
        docUID: checkSnapshot.docs[0].id,
      }));
      navigate("/message");
    }
  };

  return (
    <>
      <LikeButton
        toggleLike={toggleLike}
        isMobile={isMobile}
        isLikedByMe={isLikedByMe}
      ></LikeButton>

      <PostChatButton
        isMobile={isMobile}
        onClickChatButtonFromPost={onClickChatButtonFromPost}
      >
        채팅하기
      </PostChatButton>
      <ReportButton /* onClick={onClickReportPost} */ toLink="/" isMobile={isMobile}>
        신고하기
      </ReportButton>
    </>
  );
};
