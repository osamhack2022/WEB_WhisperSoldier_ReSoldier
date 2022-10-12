import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../lib/FAuth";
import { useEffect, useState } from "react";
import MyCommentBoard from "../components/profile/MyCommentBoard";
import MyPostLikeBoard from "../components/profile/MyPostLikeBoard";
import MyCommentLikeBoard from "../components/profile/MyCommentLikeBoard";
import MyPostBoard from "../components/profile/MyPostBoard";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";
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
  ProfileCotentBox,
} from "../styles/profile/ProfilePageStyle";
import ChangeProfile from "../components/profile/ChangeProfile";
import { whisperSodlierSessionKey } from "../lib/Const";
import { calTimeToDateString } from "../modules/CalTime";

const PROFILE = "profile";
const MYPOST = "myPost";
const MYCOMMENT = "myComment";
const LIKEPOST = "likePost";
const LIKECOMMENT = "likeComment";

const ProfilePage = () => {
  const currentUserKey = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );

  const navigate = useNavigate();
  const [currentPage, setcurrentPage] = useState("profile");

  const onLogout = async () => {
    await signOut(authService).then(() => {
      console.log("[Profile.js]로그아웃 성공");
    });
    navigate("/", { replace: true });
  };

  const onProfile = () => {
    setcurrentPage(PROFILE);
  };
  const onMyPost = () => {
    setcurrentPage(MYPOST);
  };

  const onMyComment = () => {
    setcurrentPage(MYCOMMENT);
  };

  const onLikePost = () => {
    setcurrentPage(LIKEPOST);
  };

  const onLikeComment = () => {
    setcurrentPage(LIKECOMMENT);
  };

  useEffect(() => {}, []);

  return (
    <ProfileContainer>
      <PrimaryMenuBar>
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
          <PrimaryMenuButton onClick={onLikeComment}>
            공감한 댓글
          </PrimaryMenuButton>
        </PrimaryMenuBox>
        <PrimaryMenuBox isNotTop={true}>
          <PrimaryMenuButton onClick={onLogout}>로그아웃</PrimaryMenuButton>
        </PrimaryMenuBox>
      </PrimaryMenuBar>
      <ProfileCotentBox>
        {currentPage === PROFILE && <ChangeProfile></ChangeProfile>}
        {currentPage === MYPOST && <MyPostBoard></MyPostBoard>}
        {currentPage === MYCOMMENT && <MyCommentBoard></MyCommentBoard>}
        {currentPage === LIKEPOST && <MyPostLikeBoard></MyPostLikeBoard>}
        {currentPage === LIKECOMMENT && (
          <MyCommentLikeBoard></MyCommentLikeBoard>
        )}
      </ProfileCotentBox>
    </ProfileContainer>
  );
};

export default ProfilePage;
