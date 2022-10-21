import { Link } from "react-router-dom";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { BsPencilSquare } from "react-icons/bs";
import { RiUser3Line } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsEmojiAngry } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { IoHeartDislikeOutline } from "react-icons/io5";
import media from "../../modules/MediaQuery";
import { useMediaQuery } from "react-responsive";
import { TabletQuery } from "../../lib/Const";

export const AuthButton = styled.button`
  height: 48px;
  width: 320px;
  background-color: #1a7541;
  border-radius: 25px;
  border: 2px solid rgb(26, 117, 65);
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.56px;
  margin: 10px 0 10px;
  color: #ffffff;
  font-weight: 600;
  transition: all 0.5s;
  &:hover {
    background: #0d552c;
  }
`;

export const AuthMainLink = styled(Link)`
  height: 48px;
  width: 320px;
  background-color: #1a7541;
  border-radius: 25px;
  border: 2px solid rgb(26, 117, 65);
  margin: 10px 0 10px;
  font-size: 14px;
  line-height: 48px;
  text-align: center;
  letter-spacing: 0.56px;
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.5s;
  &:hover {
    background: #0d552c;
  }
`;

export const AuthLoadingButton = styled.div`
  height: 48px;
  width: 320px;
  background-color: #c8c8c8;
  border-radius: 25px;
  border: 2px solid #003000;
  margin: 10px 0 10px;
  font-size: 14px;
  line-height: 48px;
  text-align: center;
  letter-spacing: 0.56px;
  color: #003000;
  font-weight: 600;
`;

export const AuthErrorButton = styled.div`
  height: 48px;
  width: 320px;
  background-color: #a65646;
  border-radius: 25px;
  border: 2px solid rgb(166, 86, 70);
  margin: 10px 0 10px;
  font-size: 14px;
  line-height: 48px;
  text-align: center;
  letter-spacing: 0.56px;
  color: #ffffff;
  font-weight: 600;
  animation: vibration 0.1s 5;

  @keyframes vibration {
    from {
      transform: rotate(0.5deg);
    }
    to {
      transform: rotate(-0.5deg);
    }
  }
`;

export const AuthSubLink = styled(Link)`
  height: 48px;
  width: 320px;
  padding: auto;
  background-color: #c8c8c8;
  margin: 10px 0 10px;
  border-radius: 25px;
  border: 2px solid rgb(0, 48, 0);
  line-height: 48px;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.56px;
  color: #3f3f3f;
  font-weight: 600;
  transition: all 0.5s;
  &:hover {
    background: #a6a6a6;
  }
`;

const FindPasswordButtonBlock = styled.div`
  margin: 5px 0px;
  height: 30px;
  width: fit-content;
  align-items: center;
  border-bottom: #4f4f4f solid 2px;
  transition: all 0.2s;
  &:hover {
    color: #003000;
    border-bottom: #003000 solid 3px;
  }
`;

const FindPasswordButtonLink = styled(Link)`
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.48px;
  text-decoration: none;
  color: #4f4f4f;
  font-weight: 600;
  &:hover {
    color: #003000;
  }
`;

export const FindPasswordButton = ({ toLink, children, onClick }) => {
  return (
    <FindPasswordButtonBlock onClick={onClick}>
      <FindPasswordButtonLink to={toLink}>{children}</FindPasswordButtonLink>
    </FindPasswordButtonBlock>
  );
};

export const FindPasswordButtonsContainer = styled.div`
  display: flex;
  padding: 0px 10px;
  justify-content: space-between;
`;

export const FindPasswordButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const SearchButtonShape = styled.button`
  position: relative;
  margin-left: 10px;
  background-color: #1a7541;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  transition: all 0.5s;
  cursor: pointer;
  border: 2px solid rgb(26, 117, 65);
  &:hover {
    background: #0d552c;
  }
`;

export const SearchIcon = styled(GoSearch)`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
`;

const WritePostButtonShape = styled(Link)`
  position: relative;
  padding: 8px 15px;
  color: #ffffff;
  height: 40px;
  width: 140px;
  background-color: #1a7541;
  font-weight: 500;
  font-size: 13px;
  text-align: right;
  text-decoration: none;
  border-radius: 25px;
  border: 2px solid rgb(26, 117, 65);
  transition: all 0.5s, font-size 0.1s;
  white-space: nowrap;
  overflow: hidden;
  &:hover {
    background: #0d552c;
  }
  ${media.smallDesktop`
  
    padding: inherit;
    width: 40px;
    font-weight : inherit;
    font-size : 0px;
    
    border-radius: 50%;
  `}
`;

const WritPostIcon = styled(BsPencilSquare)`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(0%, -50%);
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  ${media.smallDesktop`
    left: 50%;
    transform: translate(-50%, -50%);
    height: 40px;
    width: 40px;
    padding: 12px;
    font-weight: 100;
  `}
`;

export const WritePostButton = () => {
  return (
    <WritePostButtonShape to="/write">
      <WritPostIcon></WritPostIcon> 고민 작성하기
    </WritePostButtonShape>
  );
};

const UserProfileIcon = styled(RiUser3Line)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 40px;
  width: 40px;
  padding: 12px;
  font-weight: 100;
  color: #0d552c;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    color: #ffffff;
  }
`;

const UserProfileButtonShape = styled(Link)`
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  margin-left: 10px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  transition: all 0.5s;
  border: 1.5px solid rgb(26, 117, 65);
  &:hover {
    background: #0d552c;
  }
`;

export const UserProfileButton = () => {
  return (
    <UserProfileButtonShape to="/profile">
      <UserProfileIcon></UserProfileIcon>
    </UserProfileButtonShape>
  );
};

const ChatIcon = styled(BsChatDots)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 42px;
  width: 42px;
  padding: 13px;
  font-weight: 100;
  color: #0d552c;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    color: #ffffff;
  }
`;

const ChatButtonShape = styled(Link)`
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  height: 40px;
  width: 40px;
  margin-left: 10px;
  border-radius: 50%;
  transition: all 0.5s;
  border: 1.5px solid rgb(26, 117, 65);
  &:hover {
    background: #0d552c;
  }
`;

export const ChatButton = () => {
  return (
    <ChatButtonShape to="/message">
      <ChatIcon></ChatIcon>
    </ChatButtonShape>
  );
};

// 뒤로가기 버튼
const CommonButtonText = styled.div`
  font-size: ${(props) => (props.mobile ? "10px" : "12px")};
  text-align: center;
  letter-spacing: 0.48px;
  text-decoration: none;
  color: #4f4f4f;
  transition: all 0.3s;
  font-weight: 600;
`;

const BackButtonImg = styled(IoMdArrowBack)`
  height: 18px;
  width: 18px;
  font-weight: 100;
  margin-right: 5px;
  color: #4f4f4f;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
`;

const BackButtonBlock = styled.div`
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px;
  padding-right: ${(props) => props.mobile && "10px"};
  margin-right: ${(props) => props.mobile && "10px"};
  border-right: ${(props) =>
    props.mobile && !props.notRight && "1px solid #dcdcdc"};
  text-decoration: none;
  height: 30px;
  width: fit-content;
  align-items: center;
  transition: all 0.2s;
  cursor: pointer;
  &:hover ${CommonButtonText}, &:hover ${BackButtonImg} {
    color: #003000;
    transform: scale(1.1);
  }
`;

export const BackButton = ({ goBack, children, notRight }) => {
  const isTablet = useMediaQuery({ query: TabletQuery });
  return (
    <BackButtonBlock
      onClick={goBack}
      mobile={isTablet ? "false" : "true"}
      notRight={notRight}
    >
      <BackButtonImg></BackButtonImg>
      <CommonButtonText mobile={!isTablet ? "true" : "false"}>
        {children}
      </CommonButtonText>
    </BackButtonBlock>
  );
};

// 공감하기 버튼
const LikeButtonImg = styled(AiOutlineHeart)`
  height: 18px;
  width: 18px;
  font-weight: 100;
  margin-right: 5px;
  color: #4f4f4f;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
`;

const DisLikeButtonImg = styled(IoHeartDislikeOutline)`
  height: 18px;
  width: 18px;
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
  margin: 5px 0px;
  text-decoration: none;
  height: 30px;
  width: fit-content;
  align-items: center;
  transition: all 0.2s;
  margin-right: ${(props) => props.mobile && "10px"};
  cursor: pointer;
  &:hover
    ${CommonButtonText},
    &:hover
    ${LikeButtonImg},
    &:hover
    ${DisLikeButtonImg} {
    color: #000000;
    transform: scale(1.1);
  }
  &:hover ${LikeButtonImg} {
    fill: #eb5757;
  }
`;

export const LikeButton = ({ isMobile, toggleLike, isLikedByMe }) => {
  return (
    <LikeButtonBlock onClick={toggleLike} mobile={isMobile ? "true" : "false"}>
      {isLikedByMe ? (
        <DisLikeButtonImg></DisLikeButtonImg>
      ) : (
        <LikeButtonImg></LikeButtonImg>
      )}
      <CommonButtonText mobile={isMobile ? "true" : "false"}>
        {isLikedByMe ? "취소하기" : "공감하기"}
      </CommonButtonText>
    </LikeButtonBlock>
  );
};

// 채팅하기 버튼 BsChatDots
const PostChatButtonImg = styled(BsChatDots)`
  height: 18px;
  width: 18px;
  font-weight: 100;
  margin-right: 5px;
  color: #4f4f4f;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
`;

const PostChatButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px;
  text-decoration: none;
  height: 30px;
  width: fit-content;
  align-items: center;
  transition: all 0.2s;
  margin-right: ${(props) => props.mobile && "10px"};
  cursor: pointer;
  &:hover ${CommonButtonText}, &:hover ${PostChatButtonImg} {
    color: #000000;
    transform: scale(1.1);
  }
  &:hover ${PostChatButtonImg} {
    fill: #4181b1;
  }
`;

export const PostChatButton = ({
  children,
  isMobile,
  onClickChatButtonFromPost,
}) => {
  return (
    <PostChatButtonBlock
      onClick={onClickChatButtonFromPost}
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
  height: 18px;
  width: 18px;
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
  margin: 5px 0px;
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

export const ReportButton = ({ children, isMobile, onClick }) => {
  return (
    <ReportButtonBlock onClick={onClick} mobile={isMobile ? "true" : "false"}>
      <ReportButtonImg></ReportButtonImg>
      <CommonButtonText mobile={isMobile ? "true" : "false"}>
        {children}
      </CommonButtonText>
    </ReportButtonBlock>
  );
};

// 수정하기 버튼
const EditButtonImg = styled(FiEdit2)`
  height: 18px;
  width: 18px;
  font-weight: 100;
  margin-right: 5px;
  color: #4f4f4f;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
`;

const CancelButtonImg = styled(MdOutlineCancel)`
  height: 18px;
  width: 18px;
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
  margin: 5px 0px;
  text-decoration: none;
  height: 30px;
  width: fit-content;
  align-items: center;
  transition: all 0.2s;
  margin-right: ${(props) => props.mobile && "10px"};
  cursor: pointer;
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

export const EditPostButton = ({ toggleEditing, editing, isMobile }) => {
  return (
    <EditButtonBlock
      onClick={toggleEditing}
      mobile={isMobile ? "true" : "false"}
    >
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
  height: 18px;
  width: 18px;
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
  margin: 5px 0px;
  text-decoration: none;
  height: 30px;
  width: fit-content;
  align-items: center;
  transition: all 0.2s;
  margin-right: ${(props) => props.mobile && "10px"};
  cursor: pointer;
  &:hover ${CommonButtonText}, &:hover ${DeletePostButtonImg} {
    color: #000000;
    transform: scale(1.1);
  }

  &:hover ${DeletePostButtonImg} {
    /*fill: #1A7541;*/
    color: #a65646;
  }
`;

export const DeletePostButton = ({ onDeleteClick, isMobile }) => {
  return (
    <DeletePostButtonBlock
      onClick={onDeleteClick}
      mobile={isMobile ? "true" : "false"}
    >
      <DeletePostButtonImg></DeletePostButtonImg>
      <CommonButtonText mobile={isMobile ? "true" : "false"}>
        삭제하기
      </CommonButtonText>
    </DeletePostButtonBlock>
  );
};

// 모바일용 네비게이션 바 버튼
const SearchIconForNav = styled(GoSearch)`
  margin-top: 5px;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0);
  color: #4f4f4f;
  transition: all 0.3s;
`;

const CommonTextForNav = styled.div`
  margin-top: 10px;
  font-size: 10px;
  text-align: center;
  letter-spacing: 0.48px;
  text-decoration: none;
  color: #4f4f4f;
  transition: all 0.3s;
  font-weight: 600;
`;

const SearchNavButtonBox = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin: 5px 0px;
  text-decoration: none;
  height: 60px;
  width: 25%;
  align-items: center;
  transition: all 0.2s;
  &:hover ${SearchIconForNav}, &:hover ${CommonTextForNav} {
    color: #000000;
    transform: scale(1.1);
  }
`;

export const SearchNavButton = ({ toLink }) => {
  return (
    <SearchNavButtonBox to={toLink}>
      <SearchIconForNav></SearchIconForNav>
      <CommonTextForNav>검색</CommonTextForNav>
    </SearchNavButtonBox>
  );
};

const WriteIconForNav = styled(BsPencilSquare)`
  margin-top: 5px;
  background-color: rgba(0, 0, 0, 0);
  color: #4f4f4f;
  transition: all 0.3s;
`;

const WriteNavButtonBox = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin: 5px 0px;
  text-decoration: none;
  height: 60px;
  width: 25%;
  align-items: center;
  transition: all 0.2s;
  &:hover ${WriteIconForNav}, &:hover ${CommonTextForNav} {
    color: #000000;
    transform: scale(1.1);
  }
`;

export const WriteNavButton = () => {
  return (
    <WriteNavButtonBox to="/write">
      <WriteIconForNav></WriteIconForNav>
      <CommonTextForNav>고민 작성</CommonTextForNav>
    </WriteNavButtonBox>
  );
};

const ChatIconForNav = styled(BsChatDots)`
  margin-top: 5px;
  background-color: rgba(0, 0, 0, 0);
  color: #4f4f4f;
  transition: all 0.3s;
`;

const ChatNavButtonBox = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin: 5px 0px;
  text-decoration: none;
  height: 60px;
  width: 25%;
  align-items: center;
  transition: all 0.2s;
  &:hover ${ChatIconForNav}, &:hover ${CommonTextForNav} {
    color: #000000;
    transform: scale(1.1);
  }
`;

export const ChatNavButton = () => {
  return (
    <ChatNavButtonBox to="/message">
      <ChatIconForNav></ChatIconForNav>
      <CommonTextForNav>채팅</CommonTextForNav>
    </ChatNavButtonBox>
  );
};

const ProfileIconForNav = styled(RiUser3Line)`
  margin-top: 5px;
  background-color: rgba(0, 0, 0, 0);
  color: #4f4f4f;
  transition: all 0.3s;
`;

const ProfileNavButtonBox = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin: 5px 0px;
  text-decoration: none;
  height: 60px;
  width: 25%;
  align-items: center;
  transition: all 0.2s;
  &:hover ${ProfileIconForNav}, &:hover ${CommonTextForNav} {
    color: #000000;
    transform: scale(1.1);
  }
`;

export const ProfileNavButton = () => {
  return (
    <ProfileNavButtonBox to="/profile">
      <ProfileIconForNav></ProfileIconForNav>
      <CommonTextForNav>프로필</CommonTextForNav>
    </ProfileNavButtonBox>
  );
};
