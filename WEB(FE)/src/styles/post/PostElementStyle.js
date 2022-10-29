import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { Link } from "react-router-dom";

export const PostElementBox = styled.div`
  border-bottom: 1px solid #dcdcdc;
  padding: 10px 0px;
  margin: 3px 0px;
`;

export const PostElementTitle = styled(Link)`
  font-size: 14px;
  text-align: left;
  text-decoration: none;
  color: #3f3f3f;
  font-weight: 400;
  height: fit-content;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.postbox === "true" ? "3" : "5")};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
`;

export const PostElementTime = styled.div`
  font-size: 12px;
  text-align: left;
  color: #bdbdbd;
  font-weight: 400;
`;

const PostElementLikeIcon = styled(AiOutlineHeart)`
  height: 12px;
  width: 12px;
  font-weight: 100;
  margin-right: 5px;
  color: #eb5757;
  background-color: rgba(0, 0, 0, 0);
`;

const PostElementInfoText = styled.div`
  font-size: 12px;
  text-align: left;
  color: #4f4f4f;
  font-weight: 400;
`;

const PostElementLikeBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px;
  text-decoration: none;
  height: fit-content;
  width: fit-content;
  align-items: center;
`;

export const PostElementLikeCount = ({ children }) => {
  return (
    <PostElementLikeBox>
      <PostElementLikeIcon></PostElementLikeIcon>
      <PostElementInfoText>{children}</PostElementInfoText>
    </PostElementLikeBox>
  );
};

const PostElementCommentIcon = styled(GoComment)`
  height: 12px;
  width: 12px;
  font-weight: 100;
  margin-top: 1px;
  margin-right: 5px;
  color: #4181b1;
  background-color: rgba(0, 0, 0, 0);
`;

const PostElementCommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  text-decoration: none;
  height: fit-content;
  width: fit-content;
  align-items: center;
`;

export const PostElementCommentCount = ({ children }) => {
  return (
    <PostElementCommentBox>
      <PostElementCommentIcon></PostElementCommentIcon>
      <PostElementInfoText>{children}</PostElementInfoText>
    </PostElementCommentBox>
  );
};

export const PostElementInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3px 0px;
`;

export const PostAdditionalInfoBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PostElementTag = styled.div`
  margin-left: 10px;
  font-size: 12px;
  text-align: left;
  letter-spacing: 0.48px;
  color: #bdbdbd;
  font-weight: 400;
`;
