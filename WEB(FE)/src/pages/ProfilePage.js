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
  MyInfoText,
  MyInfoTextSection,
  PrimaryMenuBar,
  PrimaryMenuBox,
  ProfileContainer,
  ProfileCotentBox,
} from "../styles/profile/ProfilePageStyle";

const PROFILE = "profile";
const MYPOST = "myPost";
const MYCOMMENT = "myComment";
const LIKEPOST = "likePost";
const LIKECOMMENT = "likeComment";

const ProfilePage = () => {
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
              <MyInfoText>닉네임 표시 위치</MyInfoText>
              <MyInfoText notTop={true}>가입한지 100일째</MyInfoText>
            </MyInfoTextSection>
          </MyInfoBox>
        </PrimaryMenuBox>
        <PrimaryMenuBox isNotTop={true}>
          <div onClick={onProfile}>프로필 설정</div>
          <div onClick={onMyPost}>작성한 글</div>
          <div onClick={onMyComment}>작성한 댓글</div>
          <div onClick={onLikePost}>공감한 글</div>
          <div onClick={onLikeComment}>공감한 댓글</div>
        </PrimaryMenuBox>
        <PrimaryMenuBox isNotTop={true}>
          <button onClick={onLogout}>로그아웃</button>
        </PrimaryMenuBox>
      </PrimaryMenuBar>
      <ProfileCotentBox>
        {currentPage === PROFILE && <ChangePasswordForm></ChangePasswordForm>}
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
