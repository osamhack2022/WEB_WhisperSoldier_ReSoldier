import { WritePostTitle } from "../Write/WriteComponent";
import {
  WritePostButton,
  WritePostHeaderBox,
} from "../Write/WriteInputBoxHeader";

const PostContentBodyEditHeader = ({ onClick, errorEditInfo }) => {
  return (
    <WritePostHeaderBox>
      <WritePostTitle>고민 수정하기</WritePostTitle>
      <WritePostButton onClick={onClick} errorWritePostInfo={errorEditInfo}>
        {errorEditInfo ? "내용을 입력해 주세요" : "작성완료"}
      </WritePostButton>
    </WritePostHeaderBox>
  );
};

export default PostContentBodyEditHeader;
