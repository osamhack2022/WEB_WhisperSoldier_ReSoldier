import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService } from "../lib/FAuth";
import { useEffect, useState } from "react";
import MyCommentBoard from "../components/profile/MyCommentBoard";
import MyPostLikeBoard from "../components/profile/MyPostLikeBoard";
import MyCommentLikeBoard from "../components/profile/MyCommentLikeBoard";
import MyPostBoard from "../components/profile/MyPostBoard";
import {
  MyInfoBox,
  MyInfoIconBox,
  MyInfoMainText,
  MyInfoText,
  MyInfoTextSection,
  PrimaryMenuBar,
  PrimaryMenuBox,
  PrimaryMenuButton,
  ProfileContainer,

  ProfileCotentContainer,
} from "../styles/profile/ProfilePageStyle";
import ChangeProfile from "../components/profile/ChangeProfile";
import { TabletQuery, whisperSodlierSessionKey } from "../lib/Const";
import { calTimeToDateString } from "../modules/CalTime";
import { useRecoilState } from "recoil";
import { ProfileSelectStore, ShowContentStore } from "../store/ProfileStore";
import { useMediaQuery } from "react-responsive";
import SideButtonBox from "../components/common/SideButtonBox";
import { BackButton } from "../components/common/Buttons";

const ProfilePage = () => {
  const isTablet = useMediaQuery({ query: TabletQuery });
  
  const currentUserKey = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );

  const navigate = useNavigate();
  const [currentPage, setcurrentPage] = useState({
    profile : true,
    myPost : false,
    myComment : false,
    likePost : false,
    likeComment : false,
  });
  const [showContent, setShowContent] = useState(false);

  const [profileSelectStore, setProfileSelectStore] = useRecoilState(ProfileSelectStore);
  const [showContentStore, setShowContentStore] = useRecoilState(ShowContentStore);

  const onLogout = async () => {
    await signOut(authService).then(() => {
      console.log("[Profile.js]로그아웃 성공");
    });
    navigate("/", { replace: true });
  };

  const onProfile = () => {
    setcurrentPage((prev)=>({
      ...prev,
      profile : true,
      myPost : false,
      myComment : false,
      likePost : false,
      likeComment : false,
    }));
    setProfileSelectStore((prev)=>({
      ...prev,
      profile : true,
      myPost : false,
      myComment : false,
      likePost : false,
      likeComment : false,
    }));
    if(!isTablet){
      setShowContent(true);
      setShowContentStore(true);
    }
  };
  const onMyPost = () => {
    setcurrentPage((prev)=>({
      ...prev,
      profile : false,
      myPost : true,
      myComment : false,
      likePost : false,
      likeComment : false,
    }));
    setProfileSelectStore((prev)=>({
      ...prev,
      profile : false,
      myPost : true,
      myComment : false,
      likePost : false,
      likeComment : false,
    }));
    if(!isTablet){
      setShowContent(true);
      setShowContentStore(true);
    }
  };

  const onMyComment = () => {
    setcurrentPage((prev)=>({
      ...prev,
      profile : false,
      myPost : false,
      myComment : true,
      likePost : false,
      likeComment : false,
    }));
    setProfileSelectStore((prev)=>({
      ...prev,
      profile : false,
      myPost : false,
      myComment : true,
      likePost : false,
      likeComment : false,
    }));
    if(!isTablet){
      setShowContent(true);
      setShowContentStore(true);
    }
  };

  const onLikePost = () => {
    setcurrentPage((prev)=>({
      ...prev,
      profile : false,
      myPost : false,
      myComment : false,
      likePost : true,
      likeComment : false,
    }));
    setProfileSelectStore((prev)=>({
      ...prev,
      profile : false,
      myPost : false,
      myComment : false,
      likePost : true,
      likeComment : false,
    }));
    if(!isTablet){
      setShowContent(true);
      setShowContentStore(true);
    }
  };

  const onLikeComment = () => {
    setcurrentPage((prev)=>({
      ...prev,
      profile : false,
      myPost : false,
      myComment : false,
      likePost : false,
      likeComment : true,
    }));
    setProfileSelectStore((prev)=>({
      ...prev,
      profile : false,
      myPost : false,
      myComment : false,
      likePost : true,
      likeComment : false,
    }));
    if(!isTablet){
      setShowContent(true);
      setShowContentStore(true);
    }
  };

  const BackMenu = () =>{
    setShowContent(false);
      setShowContentStore(false);
  }

  useEffect(() => {
    setcurrentPage(profileSelectStore);
    setShowContent(showContentStore);
    // eslint-disable-next-line
  }, []);

  return (
    <ProfileContainer>
      {(isTablet||!showContent)&&<PrimaryMenuBar>
        <PrimaryMenuBox>
          <MyInfoBox>
            <MyInfoIconBox></MyInfoIconBox>
            <MyInfoTextSection>
              <MyInfoMainText>
                {currentUserKey.email.substring(13, 0)} 님
              </MyInfoMainText>
              <MyInfoText notTop={true}>
                위솔과 함께한지 {calTimeToDateString(currentUserKey.createdAt)}
                일째
              </MyInfoText>
            </MyInfoTextSection>
          </MyInfoBox>
        </PrimaryMenuBox>
        <PrimaryMenuBox isNotTop={true}>
          <PrimaryMenuButton onClick={onProfile}>프로필 설정</PrimaryMenuButton>
          <PrimaryMenuButton onClick={onMyPost}>작성한 글</PrimaryMenuButton>
          <PrimaryMenuButton onClick={onMyComment}>
            작성한 댓글
          </PrimaryMenuButton>
          <PrimaryMenuButton onClick={onLikePost}>공감한 글</PrimaryMenuButton>
          <PrimaryMenuButton onClick={onLikeComment} bottom={true}>
            공감한 댓글
          </PrimaryMenuButton>
        </PrimaryMenuBox>
        <PrimaryMenuBox isNotTop={true}>
          <PrimaryMenuButton onClick={onLogout} bottom={true} logout={true}>로그아웃</PrimaryMenuButton>
        </PrimaryMenuBox>
      </PrimaryMenuBar>}
      {!isTablet&&showContent&&<SideButtonBox><BackButton goBack={BackMenu} isMobile={!isTablet} notRight={true}>
            뒤로가기
          </BackButton></SideButtonBox>}
      
      {(isTablet||showContent)&&<ProfileCotentContainer>
        {currentPage.profile && <ChangeProfile></ChangeProfile>}
        {currentPage.myPost && <MyPostBoard></MyPostBoard>}
        {currentPage.myComment && <MyCommentBoard></MyCommentBoard>}
        {currentPage.likePost && <MyPostLikeBoard></MyPostLikeBoard>}
        {currentPage.likeComment && (
          <MyCommentLikeBoard></MyCommentLikeBoard>
        )}
        </ProfileCotentContainer>}

      
    </ProfileContainer>
  );
};

export default ProfilePage;
