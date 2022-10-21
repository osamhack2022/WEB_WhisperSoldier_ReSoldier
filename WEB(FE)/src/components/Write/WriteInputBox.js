import WritePostHeader from "./WriteInputBoxHeader";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authService } from "../../lib/FAuth";
import { useForm } from "../../modules/useForm";
import { dbFunction, dbService } from "../../lib/FStore";
import { IsUpdatePostList } from "../../store/PostStore";
import { ProcessInfoStore } from "../../store/SuccessStore";
import {
  BottonLine,
  InputBox,
  InputForm,
  TagInput,
  TagInputBox,
  TagInputBoxTitle,
} from "../../styles/write/WriteInputBoxStyle";

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
  const setProcessInfoStore = useSetRecoilState(ProcessInfoStore);

  const onClick = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dbService, "WorryPost"), {
        created_timestamp: serverTimestamp(),
        creator_id: authService.currentUser.uid,
        like_count: 0,
        comment_count: 0,
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
          await addDoc(collection(dbService, "Tag"), {
            tag_count: 1,
            tag_name: state.postTag.replace(/ /g, ""),
          });
        } else {
          updateDoc(doc(dbService, "Tag", querySnapshot.docs[0].id), {
            tag_count: increment(1),
          });
        }
      }

      setProcessInfoStore((prev) => ({
        ...prev,
        finishWritePost: true,
      }));
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
  };
  return (
    <InputBox>
      <WritePostHeader
        onClick={onClick}
        errorWritePostInfo={errorWritePostInfo.isError}
        state={state}
        setErrorWritePostInfo={setErrorWritePostInfo}
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
        <TagInput
          name="postTag"
          placeholder="고민 글에 태그를 추가해보세요!"
          type="text"
          value={state.postTag}
          onChange={onChange}
        ></TagInput>
        <TagInputBoxTitle>#{state.postTag.replace(/ /g, "")}</TagInputBoxTitle>
      </TagInputBox>
    </InputBox>
  );
};

export default WritePostBox;
