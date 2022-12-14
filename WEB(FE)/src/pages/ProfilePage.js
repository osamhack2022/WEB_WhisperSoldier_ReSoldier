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
import ReportedPost from "../components/admin/ReportedPost";
import ReportedComment from "../components/admin/ReportedComment";
import Logout from "../components/profile/Logout";
import { Helmet } from "react-helmet-async";

const ProfilePage = ({ isAdmin }) => {
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

  const [currentPage, setcurrentPage] = useState({
    profile: true,
    myPost: false,
    myComment: false,
    likePost: false,
    likeComment: false,
    reportedPost: false,
    reportedComment: false,
  });
  const [showContent, setShowContent] = useState(false);

  const [profileSelectStore, setProfileSelectStore] =
    useRecoilState(ProfileSelectStore);
  const [showContentStore, setShowContentStore] =
    useRecoilState(ShowContentStore);

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

  const onReportedPost = () => {
    setcurrentPage((prev) => getSelectObj(prev, "reportedPost"));
    setProfileSelectStore((prev) => getSelectObj(prev, "reportedPost"));
    if (!isTablet) {
      setShowContent(true);
      setShowContentStore(true);
    }
  };

  const onReportedComment = () => {
    setcurrentPage((prev) => getSelectObj(prev, "reportedComment"));
    setProfileSelectStore((prev) => getSelectObj(prev, "reportedComment"));
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
      setCurrentSessionKey(
        JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
      );
      setMyProfileImg(
        JSON.parse(sessionStorage.getItem(whisperSodlierSessionKey))
          .providerData[0].photoURL
      );
    }
    setUpdateProfileInfo(false);
    //eslint-disable-next-line
  }, [updateProfileInfo]);

  return (
    <>
      <Helmet>
        <title>??? ????????? - Whisper Soldier</title>
      </Helmet>
      <ProfileContainer>
        {(isTablet || !showContent) && (
          <PrimaryMenuBar>
            <PrimaryMenuBox>
              <MyInfoBox>
                <MyInfoIconBox myProfileImg={myProfileImg}></MyInfoIconBox>
                <MyInfoTextSection>
                  <MyInfoMainText>{userName} ???</MyInfoMainText>
                  <MyInfoText notTop={true}>
                    {isAdmin
                      ? "?????? ???????????? ???????????????"
                      : `????????? ????????????
                  ${calTimeToDateString(currentSessionKey.createdAt)}
                  ??????`}
                  </MyInfoText>
                </MyInfoTextSection>
              </MyInfoBox>
            </PrimaryMenuBox>
            <PrimaryMenuBox isNotTop={true}>
              {isAdmin ? (
                <>
                  <PrimaryMenuButton onClick={onProfile}>
                    ????????? ??????
                  </PrimaryMenuButton>
                  <PrimaryMenuButton onClick={onReportedPost}>
                    ????????? ???
                  </PrimaryMenuButton>
                  <PrimaryMenuButton onClick={onReportedComment} bottom={true}>
                    ????????? ??????
                  </PrimaryMenuButton>
                </>
              ) : (
                <>
                  <PrimaryMenuButton onClick={onProfile}>
                    ????????? ??????
                  </PrimaryMenuButton>
                  <PrimaryMenuButton onClick={onMyPost}>
                    ????????? ???
                  </PrimaryMenuButton>
                  <PrimaryMenuButton onClick={onMyComment}>
                    ????????? ??????
                  </PrimaryMenuButton>
                  <PrimaryMenuButton onClick={onLikePost}>
                    ????????? ???
                  </PrimaryMenuButton>
                  <PrimaryMenuButton onClick={onLikeComment} bottom={true}>
                    ????????? ??????
                  </PrimaryMenuButton>
                </>
              )}
            </PrimaryMenuBox>
            <PrimaryMenuBox isNotTop={true}>
              <Logout />
            </PrimaryMenuBox>
          </PrimaryMenuBar>
        )}
        {!isTablet && showContent && (
          <SideButtonBox>
            <BackButton goBack={BackMenu} isMobile={!isTablet} notRight={true}>
              ????????????
            </BackButton>
          </SideButtonBox>
        )}

        {(isTablet || showContent) &&
          (!isAdmin ? (
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
              {currentPage.likeComment && (
                <MyCommentLikeBoard></MyCommentLikeBoard>
              )}
            </ProfileCotentContainer>
          ) : (
            <ProfileCotentContainer>
              {currentPage.profile && (
                <ChangeProfile
                  setUserName={setUserName}
                  setUpdateProfileInfo={setUpdateProfileInfo}
                  myProfileImg={myProfileImg}
                  setMyProfileImg={setMyProfileImg}
                ></ChangeProfile>
              )}
              {currentPage.reportedPost && <ReportedPost></ReportedPost>}
              {currentPage.reportedComment && (
                <ReportedComment></ReportedComment>
              )}
            </ProfileCotentContainer>
          ))}
      </ProfileContainer>
    </>
  );
};

export default ProfilePage;
