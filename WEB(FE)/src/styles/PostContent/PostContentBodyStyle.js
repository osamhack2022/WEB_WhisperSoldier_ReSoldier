import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export const PostContentTime = styled.div`
  font-size: 12px;
  text-align: right;
  margin-right: 20px;
  letter-spacing: -0.34px;
  color: #4f4f4f;
  font-weight: 400;
`;

export const PostContentBox = styled.div`
  margin: 10px 0px 0px 0px;
  padding: 10px 0px;
  height: fit-content;
`;

export const PostContentText = styled.div`
  /* white-space: pre-wrap; */
  font-size: 14px;
  text-align: left;
  letter-spacing: 0.56px;
  color: #1d1d1d;
  word-break: break-all;
  white-space: pre-wrap;
  font-weight: 400;
  /* margin-bottom: 5px; */
`;

export const PostContentErrorText = styled.div`
  white-space: pre-wrap;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.56px;
  color: #1d1d1d;
  white-space: pre-wrap;
  font-weight: 600;
`;

export const InputForm = styled.textarea`
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

export const BottonLine = styled.div`
  margin: 5px 0px;
  border-top: 1px solid #bdbdbd;
`;

const PostContentLikeIcon = styled(AiOutlineHeart)`
  height: 12px;
  width: 12px;
  font-weight: 100;
  margin-right: 5px;
  color: #eb5757;
  fill: #eb5757;
  background-color: rgba(0, 0, 0, 0);
`;

const PostContentMyLikeIcon = styled(AiFillHeart)`
  height: 12px;
  width: 12px;
  font-weight: 100;
  margin-right: 5px;
  color: #eb5757;
  fill: #eb5757;
  background-color: rgba(0, 0, 0, 0);
`;

const PostContentInfoText = styled.div`
  font-size: 12px;
  text-align: left;
  letter-spacing: 0.48px;
  color: #4f4f4f;
  font-weight: 400;
`;

const PostContentLikeBox = styled.div`
  display: flex;
  justify-content: space-between;
  /* position: absolute; */
  /* right: 0px; */
  align-items: center;
  margin: 0px;
  text-decoration: none;
  height: fit-content;
  width: fit-content;
  align-items: center;
`;

export const PostContentLikeCount = ({ children, isMyLike }) => {
  return (
    <PostContentLikeBox>
      {isMyLike ? (
        <PostContentMyLikeIcon></PostContentMyLikeIcon>
      ) : (
        <PostContentLikeIcon></PostContentLikeIcon>
      )}
      <PostContentInfoText>{children}</PostContentInfoText>
    </PostContentLikeBox>
  );
};

export const PostContentInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 15px 0px 10px 0px;
`;
