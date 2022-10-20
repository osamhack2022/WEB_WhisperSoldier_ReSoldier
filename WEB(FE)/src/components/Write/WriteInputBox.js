import styled from "styled-components";
import media from "../../modules/MediaQuery";
import WritePostHeader from "./WriteInputBoxHeader";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authService } from "../../lib/FAuth";
import { useForm } from "../../modules/useForm";
import { dbFunction, dbService } from "../../lib/FStore";
import { IsUpdatePostList } from "../../store/PostStore";

const InputBox = styled.div`
  //margin-left: 10px;
  margin-top: 10px;
  padding: 20px;
  height: 500px;
  flex-grow: 1;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  ${media.mobile`
  //margin-top: 10px;
  //margin-left: inherit;
  width: inherit;
  `}
`;

const InputForm = styled.textarea`
  background-color: #fbfbfb;
  width: 100%;
  height: 350px;
  white-space: pre-wrap;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const BottonLine = styled.div`
  margin: 5px 0px;
  border-top: 1px solid #bdbdbd;
`;

const TagInputBox = styled.div`
  margin-top: 10px;
`;

const WritePostBox = ({ navigate }) => {
  const {
    doc,
    addDoc,
    collection,
    serverTimestamp,
    getDocs,
    query,
    where,
    updateDoc,
    increment,
  } = dbFunction;
  const [state, onChange] = useForm({ postContent: "", postTag: "" });
  const [errorWritePostInfo, setErrorWritePostInfo] = useState({
    isError: false,
  });
  const setIsUpdatePostList = useSetRecoilState(IsUpdatePostList);

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
          creator_id: authService.currentUser.uid,
          like_count: 0,
          comment_count: 0,
          post_report: false,
          post_rep_accept: false,
          tag_name: state.postTag.replace(/ /g, ""),
          text: state.postContent,
        });

        if (state.postTag) {
          const querySnapshot = await getDocs(
            query(
              collection(dbService, "Tag"),
              where("tag_name", "==", state.postTag.replace(/ /g, ""))
            )
          );
          if (querySnapshot.docs.length === 0) {
            const tagDocRef = await addDoc(collection(dbService, "Tag"), {
              tag_count: 1,
              tag_name: state.postTag.replace(/ /g, ""),
            });
            console.log("Tag added to collection with ID: ", tagDocRef.id);
          } else {
            updateDoc(doc(dbService, "Tag", querySnapshot.docs[0].id), {
              tag_count: increment(1),
            });
            console.log(
              "Tag count incremented by 1 as the tag EXISTS in collection"
            );
          }
        }

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
    <InputBox>
      <WritePostHeader
        onClick={onClick}
        errorWritePostInfo={errorWritePostInfo.isError}
      ></WritePostHeader>
      <InputForm
        name="postContent"
        placeholder="여기를 클릭하여 고민글을 작성해보세요!"
        type="text"
        value={state.postContent}
        onChange={onChange}
        required
      ></InputForm>
      <BottonLine />
      <TagInputBox>
        <input
          name="postTag"
          placeholder="태그를 정의해주세요"
          type="text"
          value={state.postTag}
          onChange={onChange}
        ></input>
      </TagInputBox>
    </InputBox>
  );
};

export default WritePostBox;
