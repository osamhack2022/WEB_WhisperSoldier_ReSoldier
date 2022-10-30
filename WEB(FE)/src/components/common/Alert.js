import { Alert, Grow } from "@mui/material";
import styled from "styled-components";
import media from "../../modules/MediaQuery";

const AlertBox = styled.div`
  position: fixed;
  text-align: center;
  z-index: 3;
  top: ${(props) =>
    props.profile
      ? "96px"
      : props.tag
      ? "90px"
      : props.write
      ? "96px"
      : props.editing === "true"
      ? "84px"
      : "134px"};
  left: 50%;
  transform: translate(-50%, 0);
  ${media.mobile`
  top: ${(props) =>
    props.tag ? "45px" : props.write ? "72px" : props.chatpage && "72px"};
  `}
`;

export const PostContentAlert = ({ alertInfo, editing }) => {
  console.log(editing === true ? "true" : "false");
  return (
    <>
      <AlertBox editing={editing === true ? "true" : "false"}>
        <Grow in={alertInfo.editPost}>
          <Alert severity="success">포스트를 수정했습니다.</Alert>
        </Grow>
      </AlertBox>
      <AlertBox editing={editing === true ? "true" : "false"}>
        <Grow in={alertInfo.tagOneLetterInput}>
          <Alert severity="warning">태그를 두글자 이상 입력해주세요.</Alert>
        </Grow>
      </AlertBox>
      <AlertBox editing={editing === true ? "true" : "false"}>
        <Grow in={alertInfo.createComment}>
          <Alert severity="success">댓글을 작성했습니다.</Alert>
        </Grow>
      </AlertBox>
      <AlertBox editing={editing === true ? "true" : "false"}>
        <Grow in={alertInfo.editComment}>
          <Alert severity="success">댓글을 수정했습니다.</Alert>
        </Grow>
      </AlertBox>
      <AlertBox editing={editing === true ? "true" : "false"}>
        <Grow in={alertInfo.deleteComment}>
          <Alert severity="error">댓글을 삭제했습니다.</Alert>
        </Grow>
      </AlertBox>
      <AlertBox editing={editing === true ? "true" : "false"}>
        <Grow in={alertInfo.addLikePost}>
          <Alert severity="success">포스트를 공감했습니다.</Alert>
        </Grow>
      </AlertBox>
      <AlertBox editing={editing === true ? "true" : "false"}>
        <Grow in={alertInfo.subLikePost}>
          <Alert severity="success">포스트 공감을 취소했습니다.</Alert>
        </Grow>
      </AlertBox>
      <AlertBox editing={editing === true ? "true" : "false"}>
        <Grow in={alertInfo.addLikeComment}>
          <Alert severity="success">댓글을 공감했습니다.</Alert>
        </Grow>
      </AlertBox>
      <AlertBox editing={editing === true ? "true" : "false"}>
        <Grow in={alertInfo.subLikeComment}>
          <Alert severity="success">댓글 공감을 취소했습니다.</Alert>
        </Grow>
      </AlertBox>
      <AlertBox editing={editing === true ? "true" : "false"}>
        <Grow in={alertInfo.reportPost}>
          <Alert severity="info">포스트 신고 접수되었습니다.</Alert>
        </Grow>
      </AlertBox>
      <AlertBox editing={editing === true ? "true" : "false"}>
        <Grow in={alertInfo.reportComment}>
          <Alert severity="info">댓글 신고 접수되었습니다.</Alert>
        </Grow>
      </AlertBox>
      <AlertBox editing={editing === true ? "true" : "false"}>
        <Grow in={alertInfo.impertinencePost}>
          <Alert severity="warning">
            본문에 부적절한 표현이 있습니다. <br />
            건전한 상담 문화에 걸맞는 표현을 사용해주세요.
          </Alert>
        </Grow>
      </AlertBox>
      <AlertBox editing={editing === true ? "true" : "false"}>
        <Grow in={alertInfo.impertinenceComment}>
          <Alert severity="warning">
            댓글에 부적절한 표현이 있습니다. <br />
            건전한 상담 문화에 걸맞는 표현을 사용해주세요.
          </Alert>
        </Grow>
      </AlertBox>
    </>
  );
};

export const HomeContentAlert = ({ alertState }) => {
  return (
    <>
      <AlertBox>
        <Grow in={alertState.writePost}>
          <Alert severity="success">
            고민 포스트를 성공적으로 업로드랬습니다.
          </Alert>
        </Grow>
      </AlertBox>

      <AlertBox>
        <Grow in={alertState.deletePost}>
          <Alert severity="error">고민 포스트를 삭제했습니다.</Alert>
        </Grow>
      </AlertBox>
    </>
  );
};

export const UpdateProfileAlert = ({ successInfo }) => {
  return (
    <>
      <AlertBox profile="true">
        <Grow in={successInfo.nickname}>
          <Alert severity="success">닉네임 변경했습니다.</Alert>
        </Grow>
      </AlertBox>

      <AlertBox profile="true">
        <Grow in={successInfo.profileImg}>
          <Alert severity="success">프로필 사진 변경했습니다.</Alert>
        </Grow>
      </AlertBox>

      <AlertBox profile="true">
        <Grow in={successInfo.defaultProfileImg}>
          <Alert severity="info">기본 프로필 사진으로 변경했습니다.</Alert>
        </Grow>
      </AlertBox>

      <AlertBox profile="true">
        <Grow in={successInfo.password}>
          <Alert severity="success">비밀번호를 변경했습니다.</Alert>
        </Grow>
      </AlertBox>

      <AlertBox profile="true">
        <Grow in={successInfo.errorPassword}>
          <Alert severity="error">
            비밀번호 보안이 약합니다.
            <br />
            8자 이상으로 설정해주세요.
          </Alert>
        </Grow>
      </AlertBox>
    </>
  );
};

export const ChatPageAlert = ({ successInfo }) => {
  return (
    <>
      <AlertBox chatpage="true">
        <Grow in={successInfo.deleteProcess}>
          <Alert severity="info">
            {successInfo.chatWithUserNickname}님과의 채팅을 종료했습니다.
          </Alert>
        </Grow>
      </AlertBox>
      <AlertBox chatpage="true">
        <Grow in={successInfo.blockProcess}>
          <Alert severity="error">
            {successInfo.chatWithUserNickname}님과의 채팅을 차단했습니다.
          </Alert>
        </Grow>
      </AlertBox>
      <AlertBox chatpage="true">
        <Grow in={successInfo.unblockProcess}>
          <Alert severity="info">
            {successInfo.chatWithUserNickname}님과의 채팅을 차단해제했습니다
          </Alert>
        </Grow>
      </AlertBox>
    </>
  );
};

export const WritePostAlert = ({ alertInfo }) => {
  return (
    <>
      <AlertBox write="true">
        <Grow in={alertInfo.impertinencePost}>
          <Alert severity="warning">
            본문에 부적절한 표현이 있습니다. <br />
            건전한 상담 문화에 걸맞는 표현을 사용해주세요.
          </Alert>
        </Grow>
      </AlertBox>
      <AlertBox write="true">
        <Grow in={alertInfo.tagOneLetterInput}>
          <Alert severity="warning">태그를 두글자 이상 입력해주세요.</Alert>
        </Grow>
      </AlertBox>
    </>
  );
};

export const TagPageAlert = ({ alertInfo }) => {
  return (
    <>
      <AlertBox tag="true">
        <Grow in={alertInfo.blankInput}>
          <Alert severity="warning">태그를 입력해 주세요.</Alert>
        </Grow>
      </AlertBox>
      <AlertBox tag="true">
        <Grow in={alertInfo.tagOneLetterInput}>
          <Alert severity="warning">태그를 두글자 이상 입력해주세요.</Alert>
        </Grow>
      </AlertBox>
    </>
  );
};
