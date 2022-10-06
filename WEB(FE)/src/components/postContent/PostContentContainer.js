import styled from "styled-components";
import { authService } from "../../lib/FAuth";
import { BackButton } from "../common/Buttons";
import SideButtonBox from "../common/SideButtonBox";
import PopularPostContainer from "../container/PopularPostContainer";
import RecommandTagContainer from "../container/RecommandTagContainer";
import InputTagContainer from "./InputTageContainer";
import PostCommentContainer from "./PostCommentContainer";
import PostContentBody from "./PostContentBody";
import PostContentTitle from "./PostContentTiltle";
import {
  OtherUserButtonContainer,
  WriteUserButtonContainer,
} from "./SideButtonContainer";

const PostContentContainerBox = styled.div`
  padding: 0px 10vw;
  display: flex;
  flex-direction: row;
`;

const SideButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostContentBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideOptionContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PostContentContainer = ({
  postInfo,
  state,
  onChange,
  editing,
  errorPostInfo,
  errorEditInfo,
  onClick,
  setState,
  onDeleteClick,
  toggleEditing,
  isDesktop,
  isTablet,
}) => {
  return (
    <PostContentContainerBox>
      <SideButtonContainer>
        <SideButtonBox isDesktop={isDesktop} isTablet={isTablet}>
          <BackButton toLink="/">뒤로가기</BackButton>
          {!isTablet &&
            postInfo.created_timestamp &&
            authService.currentUser &&
            (authService.currentUser.uid === postInfo.creator_id ? (
              <WriteUserButtonContainer
                editing={editing}
                onDeleteClick={onDeleteClick}
                toggleEditing={toggleEditing}
              ></WriteUserButtonContainer>
            ) : (
              <OtherUserButtonContainer></OtherUserButtonContainer>
            ))}
        </SideButtonBox>
        {isTablet && postInfo.created_timestamp ? (
          <SideButtonBox isNotTop={true}>
            {authService.currentUser ? (
              authService.currentUser.uid === postInfo.creator_id ? (
                <WriteUserButtonContainer
                  editing={editing}
                  onDeleteClick={onDeleteClick}
                  toggleEditing={toggleEditing}
                ></WriteUserButtonContainer>
              ) : (
                <OtherUserButtonContainer></OtherUserButtonContainer>
              )
            ) : (
              <></>
            )}
          </SideButtonBox>
        ) : (
          <></>
        )}
      </SideButtonContainer>
      <PostContentBodyContainer>
        <PostContentTitle
          postInfo={postInfo}
          errorPostInfo={errorPostInfo}
        ></PostContentTitle>
        <PostContentBody
          postInfo={postInfo}
          state={state}
          onChange={onChange}
          editing={editing}
          errorPostInfo={errorPostInfo}
          onClick={onClick}
          errorEditInfo={errorEditInfo}
        ></PostContentBody>
        {postInfo.created_timestamp && !editing && (
          <PostCommentContainer
            postInfo={postInfo}
            state={state}
            setState={setState}
            onChange={onChange}
          ></PostCommentContainer>
        )}
      </PostContentBodyContainer>
      <SideOptionContainer>
        {postInfo.created_timestamp ? (
          editing ? (
            <>
              <InputTagContainer></InputTagContainer>
              <RecommandTagContainer></RecommandTagContainer>
            </>
          ) : (
            <PopularPostContainer></PopularPostContainer>
          )
        ) : (
          <></>
        )}
      </SideOptionContainer>
    </PostContentContainerBox>
  );
};

export default PostContentContainer;
