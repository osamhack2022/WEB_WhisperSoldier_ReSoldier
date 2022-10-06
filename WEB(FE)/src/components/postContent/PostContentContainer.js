import styled from "styled-components";
import { authService } from "../../lib/FAuth";
import {
  PostContentBodyContainer,
  PostContentContainerBox,
  SideButtonContainer,
} from "../../styles/PostContent/PostContentContainerStyle";
import { SideOptionContainer } from "../../styles/write/WriteContainerStyle";
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
    <PostContentContainerBox isDesktop={isDesktop} isTablet={isTablet}>
      <SideButtonContainer isDesktop={isDesktop} isTablet={isTablet}>
        <SideButtonBox isDesktop={isDesktop} isTablet={isTablet}>
          <BackButton toLink="/" isMobile={!isTablet}>
            뒤로가기
          </BackButton>
          {!isTablet &&
            postInfo.created_timestamp &&
            authService.currentUser &&
            (authService.currentUser.uid === postInfo.creator_id ? (
              <WriteUserButtonContainer
                editing={editing}
                onDeleteClick={onDeleteClick}
                toggleEditing={toggleEditing}
                isMobile={!isTablet}
              ></WriteUserButtonContainer>
            ) : (
              <OtherUserButtonContainer
                isMobile={!isTablet}
              ></OtherUserButtonContainer>
            ))}
        </SideButtonBox>

        {isTablet && postInfo.created_timestamp ? (
          <SideButtonBox
            isNotTop={true}
            isDesktop={isDesktop}
            isTablet={isTablet}
          >
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
      <PostContentBodyContainer isDesktop={isDesktop} isTablet={isTablet}>
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
            isTablet={isTablet}
          ></PostCommentContainer>
        )}
      </PostContentBodyContainer>
      <SideOptionContainer isDesktop={isDesktop} isTablet={isTablet}>
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
