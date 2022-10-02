import { WritePostTitle } from "../Write/WriteComponent";
import {
  WritePostButton,
  WritePostHeaderBox,
} from "../Write/WriteInputBoxHeader";

const PostContentBodyEditHeader = ({ onClick }) => {
  return (
    <WritePostHeaderBox>
      <WritePostTitle>고민 수정하기</WritePostTitle>
      <WritePostButton onClick={onClick}>수정 완료</WritePostButton>
    </WritePostHeaderBox>
  );
};

export default PostContentBodyEditHeader;
