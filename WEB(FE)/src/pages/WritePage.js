import { useNavigate } from "react-router-dom";
import { authService } from "../lib/FAuth";
import { dbService } from "../lib/FStore";
import { addDoc, doc, updateDoc, getDocs, query, increment, where, collection, serverTimestamp } from "firebase/firestore";
import WriteContainer from "../components/Write/WriteContainer";
import { useForm } from "../modules/useForm";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IsUpdatePostList } from "../store/PostStore";

const WritePage = () => {
  const [state, onChange] = useForm({
    postContent: "",
    postTag: "",
  });
  const [errorWritePostInfo, setErrorWritePostInfo] = useState({
    isError: false,
  });
  const setIsUpdatePostList = useSetRecoilState(IsUpdatePostList);
  const navigate = useNavigate();

  const onClick = async (e) => {
    e.preventDefault();
    if (state.postContent.length === 0) {
      setErrorWritePostInfo((prev) => ({ ...prev, isError: true }));
      setTimeout(() => {
        setErrorWritePostInfo((prev) => ({ ...prev, isError: false }));
      }, 3000);
    } else {
      try {
        const docRef = await addDoc(collection(dbService, "WorryPost"), {
          created_timestamp: serverTimestamp(),
          creator_id: authService.currentUser.uid, // 현재 사용자의 uid
          like_count: 0,
          comment_count: 0,
          post_rep_accept: false,
          tag_name: state.postTag,
          text: state.postContent,
        });
        console.log("Document written with ID: ", docRef.id);
				
				// 태그가 없을 경우에는 따로 Tag 컬렉션에 추가하지 않는다.
				if (state.postTag !== "") {
          const querySnapshot = await getDocs(query(collection(dbService, "Tag"),
            where("tag_name", "==", state.postTag)
          ));
					if (querySnapshot.docs.length === 0) {
						const tagDocRef = await addDoc(collection(dbService, "Tag"), {
							tag_count: 1,
							tag_name: state.postTag,
						});
						console.log("Tag added to collection with ID: ", tagDocRef.id);
					} else {
						updateDoc(doc(dbService, "Tag", querySnapshot.docs[0].id), {
							"tag_count": increment(1),
						});
						console.log("Tag count incremented by 1 as the tag EXISTS in collection")
					}
				}
				
				// 쿼리를 통해서 Tags 컬렉션에 해당 태그의 문서가 존재하는지 확인
				// 만약 snapshot.docs.length가 0이면 존재하지 않는다는뜻
				// 존재하지 않는다면, addDoc을 통해서 추가. tag_count는 1
				// 존재한다면, updatedoc과 increment(1)을 통해서 추가
        alert("고민이 정상적으로 업로드되었습니다.");
        setIsUpdatePostList((prev) => ({
          ...prev,
          searchPage: true,
          newestPage: true,
          popularPage: true,
        }));
        navigate("/");
      } catch (error) {
        console.log("Error adding document: ", error);
      }
    }
  };
  return (
    <>
      <WriteContainer
        state={state}
        onChange={onChange}
        errorWritePostInfo={errorWritePostInfo}
        onClick={onClick}
      ></WriteContainer>
    </>
  );
};

export default WritePage;
