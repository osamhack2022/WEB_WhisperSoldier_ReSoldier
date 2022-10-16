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
import {
  ProfileSelectStore,
  ShowContentStore,
  UpdateProfileInfo,
} from "../store/ProfileStore";
import { useMediaQuery } from "react-responsive";
import SideButtonBox from "../components/common/SideButtonBox";
import { BackButton } from "../components/common/Buttons";
import { getSelectObj } from "../modules/GetSelectObj";

const ProfilePage = () => {
  const [myProfileImg, setMyProfileImg] = useState(
    JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey)).providerData[0]
      .photoURL
  );
  const [updateProfileInfo, setUpdateProfileInfo] =
    useRecoilState(UpdateProfileInfo);

  const isTablet = useMediaQuery({ query: TabletQuery });

  const [currentSessionKey, setCurrentSessionKey] = useState(
    JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
  );

  const [userName, setUserName] = useState(
    JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey)).providerData[0]
      .displayName
  );

  const navigate = useNavigate();
  const [currentPage, setcurrentPage] = useState({
    profile: true,
    myPost: false,
    myComment: false,
    likePost: false,
    likeComment: false,
  });
  const [showContent, setShowContent] = useState(false);

  const [profileSelectStore, setProfileSelectStore] =
    useRecoilState(ProfileSelectStore);
  const [showContentStore, setShowContentStore] =
    useRecoilState(ShowContentStore);

  const onLogout = async () => {
    await signOut(authService).then(() => {
      console.log("[Profile.js]로그아웃 성공");
    });
    navigate("/", { replace: true });
  };

  const onProfile = () => {
    setcurrentPage((prev) => getSelectObj(prev, "profile"));
    setProfileSelectStore((prev) => getSelectObj(prev, "profile"));
    if (!isTablet) {
      setShowContent(true);
      setShowContentStore(true);
    }
  };
  const onMyPost = () => {
    setcurrentPage((prev) => getSelectObj(prev, "myPost"));
    setProfileSelectStore((prev) => getSelectObj(prev, "myPost"));
    if (!isTablet) {
      setShowContent(true);
      setShowContentStore(true);
    }
  };

  const onMyComment = () => {
    setcurrentPage((prev) => getSelectObj(prev, "myComment"));
    setProfileSelectStore((prev) => getSelectObj(prev, "myComment"));
    if (!isTablet) {
      setShowContent(true);
      setShowContentStore(true);
    }
  };

  const onLikePost = () => {
    setcurrentPage((prev) => getSelectObj(prev, "likePost"));
    setProfileSelectStore((prev) => getSelectObj(prev, "likePost"));
    if (!isTablet) {
      setShowContent(true);
      setShowContentStore(true);
    }
  };

  const onLikeComment = () => {
    setcurrentPage((prev) => getSelectObj(prev, "likeComment"));
    setProfileSelectStore((prev) => getSelectObj(prev, "likeComment"));
    if (!isTablet) {
      setShowContent(true);
      setShowContentStore(true);
    }
  };

  const BackMenu = () => {
    setShowContent(false);
    setShowContentStore(false);
  };

  useEffect(() => {
    setcurrentPage(profileSelectStore);
    setShowContent(showContentStore);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (updateProfileInfo) {
      setCurrentSessionKey((prev) =>
        JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
      );
      setMyProfileImg(
        JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
          .providerData[0].photoURL
      );
    }
    setUpdateProfileInfo(false);
  }, [updateProfileInfo]);

  return (
    <ProfileContainer>
      {(isTablet || !showContent) && (
        <PrimaryMenuBar>
          <PrimaryMenuBox>
            <MyInfoBox>
              <MyInfoIconBox myProfileImg={myProfileImg}></MyInfoIconBox>
              <MyInfoTextSection>
                <MyInfoMainText>{userName} 님</MyInfoMainText>
                <MyInfoText notTop={true}>
                  위솔과 함께한지{" "}
                  {calTimeToDateString(currentSessionKey.createdAt)}
                  일째
                </MyInfoText>
              </MyInfoTextSection>
            </MyInfoBox>
          </PrimaryMenuBox>
          <PrimaryMenuBox isNotTop={true}>
            <PrimaryMenuButton onClick={onProfile}>
              프로필 설정
            </PrimaryMenuButton>
            <PrimaryMenuButton onClick={onMyPost}>작성한 글</PrimaryMenuButton>
            <PrimaryMenuButton onClick={onMyComment}>
              작성한 댓글
            </PrimaryMenuButton>
            <PrimaryMenuButton onClick={onLikePost}>
              공감한 글
            </PrimaryMenuButton>
            <PrimaryMenuButton onClick={onLikeComment} bottom={true}>
              공감한 댓글
            </PrimaryMenuButton>
          </PrimaryMenuBox>
          <PrimaryMenuBox isNotTop={true}>
            <PrimaryMenuButton onClick={onLogout} bottom={true} logout={true}>
              로그아웃
            </PrimaryMenuButton>
          </PrimaryMenuBox>
        </PrimaryMenuBar>
      )}
      {!isTablet && showContent && (
        <SideButtonBox>
          <BackButton goBack={BackMenu} isMobile={!isTablet} notRight={true}>
            뒤로가기
          </BackButton>
        </SideButtonBox>
      )}

      {(isTablet || showContent) && (
        <ProfileCotentContainer>
          {currentPage.profile && (
            <ChangeProfile
              setUserName={setUserName}
              setUpdateProfileInfo={setUpdateProfileInfo}
              myProfileImg={myProfileImg}
              setMyProfileImg={setMyProfileImg}
            ></ChangeProfile>
          )}
          {currentPage.myPost && <MyPostBoard></MyPostBoard>}
          {currentPage.myComment && <MyCommentBoard></MyCommentBoard>}
          {currentPage.likePost && <MyPostLikeBoard></MyPostLikeBoard>}
          {currentPage.likeComment && <MyCommentLikeBoard></MyCommentLikeBoard>}
        </ProfileCotentContainer>
      )}
    </ProfileContainer>
  );
};

export default ProfilePage;
