import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../lib/FAuth";
import React, { useState, useEffect } from "react";
import MyCommentBoard from "../components/profilePage/MyCommentBoard";
import MyPostLikeBoard from "../components/profilePage/MyPostLikeBoard";
import MyCommentLikeBoard from "../components/profilePage/MyCommentLikeBoard";
import MyPostBoard from "../components/profilePage/MyPostBoard";

const ProfilePage = () => {
  const navigate = useNavigate();
  const onClick = async () => {
    await signOut(authService).then(() => {
      console.log("[Profile.js]로그아웃 성공");
    });
    navigate("/");
  };
  useEffect(() => {
    
  }, [])

  return (
    <div>
      <div>프로필 페이지 페이지</div>
      <div>가입한지 몇일째</div>
      <MyPostBoard></MyPostBoard>
      <MyCommentBoard></MyCommentBoard>
      <MyPostLikeBoard></MyPostLikeBoard>
      <MyCommentLikeBoard></MyCommentLikeBoard>
      <br />
      <Link to="/">홈페이지</Link>
      <br />
      <button onClick={onClick}>로그아웃</button>
    </div>
  );
};

export default ProfilePage;
