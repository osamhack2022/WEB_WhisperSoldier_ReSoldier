import styled from "styled-components";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { RiUser3Line } from "react-icons/ri";
import { useCallback } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsEmojiAngry } from "react-icons/bs";
import { BsChatDots } from "react-icons/bs";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";

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
  margin-top: 10px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 100%;
`;

export const CommentUserBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CommentUserText = styled.div`
  margin-left: 5px;
  font-size: 13px;
  font-weight: 600;
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

const MyInfoIcon = styled(FaUserCircle)`
  height: 40px;
  width: 40px;
  color: #555555;
`;

const MyInfoIconBoxStyle = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
`;

export const MyInfoIconBox = ({ commentUserProfileImg }) => {
  return (
    <MyInfoIconBoxStyle>
      {commentUserProfileImg ? (
        <Avatar
          alt="userImg"
          src={commentUserProfileImg}
          sx={{ width: 40, height: 40 }}
        />
      ) : (
        <MyInfoIcon></MyInfoIcon>
      )}
    </MyInfoIconBoxStyle>
  );
};

export const CommentUserIcon = () => {
  return (
    <CommentUserIconShape>
      <CommentUserIconImg></CommentUserIconImg>
    </CommentUserIconShape>
  );
};

export const CommentTimeText = styled.div`
  position: absolute;
  right: 60px;
  margin-right: 10px;
  font-size: 12px;
  text-align: right;
  letter-spacing: -0.34px;
  color: #4f4f4f;
  font-weight: 400;
`;

export const CommentText = styled.div`
  white-space: pre-wrap;
  margin-bottom: 10px;
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
  font-size: ${(props) => (props.mobile ? "10px" : "11px")};
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
      <CommonButtonText mobile={isMobile ? "true" : "false"}>
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
      <CommonButtonText mobile={isMobile ? "true" : "false"}>
        삭제하기
      </CommonButtonText>
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

const DisLikeButtonImg = styled(IoHeartDislikeOutline)`
  height: 14px;
  width: 14px;
  font-weight: 100;
  margin-right: 5px;
  color: #4f4f4f;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
`;

const LikeButtonBlock = styled.div`
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

export const LikeCommentButton = ({
  children,
  isMobile,
  toggleLike,
  isLikedByMe,
}) => {
  return (
    <LikeButtonBlock mobile={isMobile ? "true" : "false"} onClick={toggleLike}>
      {isLikedByMe ? (
        <DisLikeButtonImg></DisLikeButtonImg>
      ) : (
        <LikeButtonImg></LikeButtonImg>
      )}
      <CommonButtonText mobile={isMobile ? "true" : "false"}>
        {children}
      </CommonButtonText>
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
  margin-right: 10px;
  &:hover ${CommonButtonText}, &:hover ${PostChatButtonImg} {
    color: #000000;
    transform: scale(1.1);
  }
  &:hover ${PostChatButtonImg} {
    fill: #4181b1;
  }
`;

export const PostChatCommentButton = ({
  toLink,
  children,
  isMobile,
  onClickChatButtonFromComment,
}) => {
  return (
    <PostChatButtonBlock
      /* to={toLink} */ onClick={onClickChatButtonFromComment}
      mobile={isMobile ? "true" : "false"}
    >
      <PostChatButtonImg></PostChatButtonImg>
      <CommonButtonText mobile={isMobile ? "true" : "false"}>
        {children}
      </CommonButtonText>
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

export const ReportCommentButton = ({ children, isMobile, onClickReportComment }) => {
  return (
    <ReportButtonBlock onClick={onClickReportComment} mobile={isMobile ? "true" : "false"}>
      <ReportButtonImg></ReportButtonImg>
      <CommonButtonText mobile={isMobile ? "true" : "false"}>
        {children}
      </CommonButtonText>
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
  font-size: ${(props) => (props.mobile ? "10px" : "11px")};
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
      <EditErrorButtonText mobile={isMobile ? "true" : "false"}>
        내용을 입력해주세요
      </EditErrorButtonText>
    </EditErrorButtonBlock>
  ) : (
    <EditComfirmButtonBlock onClick={onCommentChange}>
      <EditComfirmButtonImg></EditComfirmButtonImg>
      <CommonButtonText mobile={isMobile ? "true" : "false"}>
        수정완료
      </CommonButtonText>
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

const CommentContentLikeIcon = styled(AiOutlineHeart)`
  height: 12px;
  width: 12px;
  font-weight: 100;
  margin-right: 5px;
  color: #eb5757;
  fill: #eb5757;
  background-color: rgba(0, 0, 0, 0);
`;

const CommentContentMyLikeIcon = styled(AiFillHeart)`
  height: 12px;
  width: 12px;
  font-weight: 100;
  margin-right: 5px;
  color: #eb5757;
  fill: #eb5757;
  background-color: rgba(0, 0, 0, 0);
`;

const CommentContentInfoText = styled.div`
  font-size: 12px;
  text-align: left;
  letter-spacing: 0.48px;
  color: #4f4f4f;
  font-weight: 400;
`;

const CommentContentLikeBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: 20px;
  align-items: center;
  margin: 0px;
  text-decoration: none;
  height: fit-content;
  width: fit-content;
  align-items: center;
`;

export const CommentContentLikeCount = ({ children, isMyLike }) => {
  return (
    <CommentContentLikeBox>
      {isMyLike ? (
        <CommentContentMyLikeIcon></CommentContentMyLikeIcon>
      ) : (
        <CommentContentLikeIcon></CommentContentLikeIcon>
      )}
      <CommentContentInfoText>{children}</CommentContentInfoText>
    </CommentContentLikeBox>
  );
};
