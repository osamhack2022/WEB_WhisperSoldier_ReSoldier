import { useNavigate } from "react-router-dom";
import { authService } from "../lib/FAuth";
import { dbService } from "../lib/FStore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import WriteContainer from "../components/container/WriteContainer";
import useForm from "../modules/useForm";

const WritePage = () => {
  const [state, onChange] = useForm({ postContent: "" });
  const navigate = useNavigate();

  const onClick = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "WorryPost"), {
        created_timestamp: serverTimestamp(),
        creator_id: authService.currentUser.uid, // 현재 사용자의 uid
        like_count: 0,
        post_rep_accept: false,
        tag_name: "",
        text: state.postContent,
      });
      console.log("WorryPost written with ID: ", docRef.id);
      alert("고민이 정상적으로 업로드되었습니다.");
      navigate("/");
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };
  return (
    <>
      <WriteContainer
        state={state}
        onChange={onChange}
        onClick={onClick}
      ></WriteContainer>
    </>
  );
};

export default WritePage;
