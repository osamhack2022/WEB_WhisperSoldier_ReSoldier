import styled from "styled-components";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { RiUser3Line } from "react-icons/ri";
import { useCallback } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { BsEmojiAngry } from "react-icons/bs";
import { BsChatDots } from "react-icons/bs";
import { Link } from "react-router-dom";

export const CommentBox = styled.div`
  position: relative;
  padding: 7px;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dcdcdc;
  font-size: 14px;
`;

export const CommentTitle = styled.div`
  display: flex;
  margin-bottom: 7px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 100%;
`;

export const CommentUserBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CommentUserText = styled.div`
  margin-left: 5px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.48px;
  text-align: left;
`;

const CommentUserIconImg = styled(RiUser3Line)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 20px;
  width: 20px;
  padding: 5px;
  font-weight: 100;
  color: #000000;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    color: #ffffff;
  }
`;

const CommentUserIconShape = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  height: 20px;
  width: 20px;
  border-radius: 50%;
  transition: all 0.5s;
  border: 1px solid #000000;
  &:hover {
    background: #0d552c;
  }
`;

export const CommentUserIcon = () => {
  return (
    <CommentUserIconShape>
      <CommentUserIconImg></CommentUserIconImg>
    </CommentUserIconShape>
  );
};

export const CommentTimeText = styled.div`
  font-size: 12px;
  text-align: right;
  letter-spacing: -0.34px;
  color: #4f4f4f;
  font-weight: 400;
`;

export const CommentText = styled.div`
  white-space: "pre-wrap";
  margin-bottom: 3px;

  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: 0.56px;
  text-align: left;
  color: #000;
`;

export const CommentButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  height: fit-content;
  width: 100%;
`;

const CommonButtonText = styled.div`
  font-size: ${(props) => (props.isMobile ? "10px" : "11px")};
  text-align: center;
  letter-spacing: 0.48px;
  text-decoration: none;
  color: #4f4f4f;
  transition: all 0.3s;
  font-weight: 600;
`;

// 수정하기 버튼
const EditButtonImg = styled(FiEdit2)`
  height: 14px;
  width: 14px;
  font-weight: 100;
  margin-right: 5px;
  color: #4f4f4f;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
`;

const CancelButtonImg = styled(MdOutlineCancel)`
  height: 14px;
  width: 14px;
  font-weight: 100;
  margin-right: 5px;
  color: #4f4f4f;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
`;
const EditButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  height: 30px;
  width: fit-content;
  align-items: center;
  transition: all 0.2s;
  &:hover
    ${CommonButtonText},
    &:hover
    ${EditButtonImg}
    &:hover
    ${CancelButtonImg} {
    color: #000000;
    transform: scale(1.1);
  }
  &:hover ${EditButtonImg} {
    /*fill: #1A7541;*/
    color: #1a7541;
  }
  &:hover ${CancelButtonImg} {
    /*fill: #1A7541;*/
    color: #a65646;
  }
`;

export const EditCommentButton = ({ toggleEditing, editing, isMobile }) => {
  return (
    <EditButtonBlock onClick={toggleEditing}>
      {editing ? (
        <CancelButtonImg></CancelButtonImg>
      ) : (
        <EditButtonImg></EditButtonImg>
      )}
      <CommonButtonText isMobile={isMobile}>
        {editing ? "취소하기" : "수정하기"}
      </CommonButtonText>
    </EditButtonBlock>
  );
};

// 삭제하기 버튼 HiOutlineTrash
const DeletePostButtonImg = styled(HiOutlineTrash)`
  height: 14px;
  width: 14px;
  font-weight: 100;
  margin-right: 5px;
  color: #4f4f4f;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
`;
const DeletePostButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 10px;
  text-decoration: none;
  height: 30px;
  width: fit-content;
  align-items: center;
  transition: all 0.2s;
  &:hover ${CommonButtonText}, &:hover ${DeletePostButtonImg} {
    color: #000000;
    transform: scale(1.1);
  }

  &:hover ${DeletePostButtonImg} {
    /*fill: #1A7541;*/
    color: #a65646;
  }
`;

export const DeleteCommentButton = ({ onDeleteClick, isMobile }) => {
  return (
    <DeletePostButtonBlock onClick={onDeleteClick}>
      <DeletePostButtonImg></DeletePostButtonImg>
      <CommonButtonText isMobile={isMobile}>삭제하기</CommonButtonText>
    </DeletePostButtonBlock>
  );
};

// 공감하기 버튼
const LikeButtonImg = styled(AiOutlineHeart)`
  height: 14px;
  width: 14px;
  font-weight: 100;
  margin-right: 5px;
  color: #4f4f4f;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
`;

const LikeButtonBlock = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  height: 30px;
  width: fit-content;
  align-items: center;
  transition: all 0.2s;
  margin-right: 10px;
  &:hover ${CommonButtonText}, &:hover ${LikeButtonImg} {
    color: #000000;
    transform: scale(1.1);
  }
  &:hover ${LikeButtonImg} {
    fill: #eb5757;
  }
`;

export const LikeCommentButton = ({ toLink, children, isMobile }) => {
  return (
    <LikeButtonBlock to={toLink} isMobile={isMobile}>
      <LikeButtonImg></LikeButtonImg>
      <CommonButtonText isMobile={isMobile}>{children}</CommonButtonText>
    </LikeButtonBlock>
  );
};

// 채팅하기 버튼 BsChatDots
const PostChatButtonImg = styled(BsChatDots)`
  height: 14px;
  width: 14px;
  font-weight: 100;
  margin-right: 5px;
  color: #4f4f4f;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
`;

const PostChatButtonBlock = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  height: 30px;
  width: fit-content;
  align-items: center;
  transition: all 0.2s;
  margin-right:10px;
  &:hover ${CommonButtonText}, &:hover ${PostChatButtonImg} {
    color: #000000;
    transform: scale(1.1);
  }
  &:hover ${PostChatButtonImg} {
    fill: #4181b1;
  }
`;

export const PostChatCommentButton = ({ toLink, children, isMobile }) => {
  return (
    <PostChatButtonBlock to={toLink} isMobile={isMobile}>
      <PostChatButtonImg></PostChatButtonImg>
      <CommonButtonText isMobile={isMobile}>{children}</CommonButtonText>
    </PostChatButtonBlock>
  );
};

//신고하기 버튼 BsEmojiAngry
const ReportButtonImg = styled(BsEmojiAngry)`
  height: 14px;
  width: 14px;
  font-weight: 100;
  margin-right: 5px;
  color: #4f4f4f;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
`;

const ReportButtonBlock = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  height: 30px;
  width: fit-content;
  align-items: center;
  transition: all 0.2s;
  &:hover ${CommonButtonText}, &:hover ${ReportButtonImg} {
    color: #000000;
    transform: scale(1.1);
  }
  &:hover ${ReportButtonImg} {
    fill: #b78841;
  }
`;

export const ReportCommentButton = ({ toLink, children, isMobile }) => {
  return (
    <ReportButtonBlock to={toLink} isMobile={isMobile}>
      <ReportButtonImg></ReportButtonImg>
      <CommonButtonText isMobile={isMobile}>{children}</CommonButtonText>
    </ReportButtonBlock>
  );
};

// 수정 완료하기 버튼 HiOutlineTrash
const EditComfirmButtonImg = styled(BsPencilSquare)`
  height: 14px;
  width: 14px;
  font-weight: 100;
  margin-right: 5px;
  color: #4f4f4f;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
`;
const EditComfirmButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 10px;
  text-decoration: none;
  height: 30px;
  width: fit-content;
  align-items: center;
  transition: all 0.2s;
  &:hover ${CommonButtonText}, &:hover ${EditComfirmButtonImg} {
    color: #000000;
    transform: scale(1.1);
  }

  &:hover ${EditComfirmButtonImg} {
    /*fill: #1A7541;*/
    color: #1a7541;
  }
`;

const EditErrorButtonIcon = styled(IoWarningOutline)`
  height: 14px;
  width: 14px;
  font-weight: 100;
  margin-right: 5px;
  color: #a65646;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
`;

const EditErrorButtonText = styled.div`
  font-size: ${(props) => (props.isMobile ? "10px" : "11px")};
  text-align: center;
  letter-spacing: 0.48px;
  text-decoration: none;
  color: #a65646;
  transition: all 0.3s;
  font-weight: 600;
  transition: all 0.5s;
  animation: vibration 0.1s 5;
  @keyframes vibration {
    from {
      transform: rotate(1deg);
    }
    to {
      transform: rotate(-1deg);
    }
  }
`;

const EditErrorButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 10px;
  text-decoration: none;
  height: 30px;
  width: fit-content;
  align-items: center;
  transition: all 0.2s;
`;

export const EditComfirmButton = ({
  onCommentChange,
  editCommentErrorInfo,
  isMobile,
}) => {
  console.log(editCommentErrorInfo);
  return editCommentErrorInfo ? (
    <EditErrorButtonBlock>
      <EditErrorButtonIcon></EditErrorButtonIcon>
      <EditErrorButtonText isMobile={isMobile}>
        내용을 입력해주세요
      </EditErrorButtonText>
    </EditErrorButtonBlock>
  ) : (
    <EditComfirmButtonBlock onClick={onCommentChange}>
      <EditComfirmButtonImg></EditComfirmButtonImg>
      <CommonButtonText isMobile={isMobile}>수정완료</CommonButtonText>
    </EditComfirmButtonBlock>
  );
};

const CommentElementTextArea = styled.textarea`
  background-color: #fbfbfb;
  width: 100%;
  max-height: 30vh;
  white-space: pre-wrap;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const BottonLine = styled.div`
  margin: 1px 0px;
  border-top: 1px solid #bdbdbd;
`;

export const CommentELementEditBox = ({ newComment, onCommentChange }) => {
  const autoResizeTextarea = useCallback(() => {
    let textarea = document.querySelector(".autoTextarea");

    if (textarea) {
      textarea.style.height = "auto";
      let height = textarea.scrollHeight; // 높이
      textarea.style.height = `${height}px`;
    }
  }, []);
  return (
    <>
      <CommentElementTextArea
        style={{ whiteSpace: "pre-wrap" }}
        value={newComment}
        onChange={onCommentChange}
        maxLength={2000}
        onInput={autoResizeTextarea}
      ></CommentElementTextArea>
      <BottonLine></BottonLine>
    </>
  );
};
