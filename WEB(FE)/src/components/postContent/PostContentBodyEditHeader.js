import { WritePostTitle } from "../Write/WriteComponent";
import {
  ErrorWritePostButton,
  WritePostButton,
  WritePostHeaderBox,
} from "../Write/WriteInputBoxHeader";

const PostContentBodyEditHeader = ({ onClick, errorEditInfo }) => {
  return (
    <WritePostHeaderBox>
      <WritePostTitle>고민 수정하기</WritePostTitle>
      {errorEditInfo?<ErrorWritePostButton>내용을 입력해 주세요</ErrorWritePostButton>:<WritePostButton onClick={onClick}>수정 완료</WritePostButton>}
    </WritePostHeaderBox>
  );
};

export default PostContentBodyEditHeader;
