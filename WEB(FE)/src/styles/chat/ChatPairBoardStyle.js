import styled from "styled-components";
import media from "../../modules/MediaQuery";

export const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  padding-bottom: 10px;
  min-width: 300px;
  max-width: 300px;
  ${media.tablet`
max-width : inherit;
min-width : inherit;
width:50%;`}
  ${media.mobile`
width: 100%;
`}
`;

export const ChatListTitleBox = styled.div`
  margin: 10px 0px 5px 0px;
  padding: 7px 0px 12px 0px;
  height: fit-content;
  border-bottom: 1px solid rgb(189, 189, 189);
  width: 100%;
`;

export const ChatListTitleText = styled.div`
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  /* line-height: 1.2; */
`;

const LoadingBoxStyle = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.div`
  margin: 5px 0px;
  font-size: 16px;
  font-weight: 400;
`;

export const LoadingBox = () => {
  return (
    <LoadingBoxStyle>
      <LoadingText>잠시만 기다려주세요</LoadingText>
    </LoadingBoxStyle>
  );
};

export const NoChatListBox = () => {
  return (
    <LoadingBoxStyle>
      <LoadingText>채팅 목록이 없습니다.</LoadingText>
    </LoadingBoxStyle>
  );
};
