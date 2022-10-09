import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TabletQuery } from "../../lib/Const";
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
  toggleLike,
  isLikedByMe,
}) => {
  const isTablet = useMediaQuery({ query: TabletQuery });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <PostContentContainerBox>
      <SideButtonContainer>
        <SideButtonBox>
          <BackButton goBack={goBack} isMobile={!isTablet}>
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
                toggleLike={toggleLike}
                isLikedByMe={isLikedByMe}
              ></OtherUserButtonContainer>
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
                <OtherUserButtonContainer
                  toggleLike={toggleLike}
                  isLikedByMe={isLikedByMe}
                ></OtherUserButtonContainer>
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
          isMyLike={isLikedByMe}
        ></PostContentTitle>
        <PostContentBody
          postInfo={postInfo}
          state={state}
          onChange={onChange}
          editing={editing}
          onClick={onClick}
          errorPostInfo={errorPostInfo}
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
