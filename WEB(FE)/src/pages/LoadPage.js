import styled from "styled-components";
import { AuthLogo, SubLogo } from "../components/common/Logos";
import CircularProgress from "@mui/material/CircularProgress";

const LoadBlock = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: fit-content;
  width: 320px;
  background-color: #f6f6f6;
`;

const InfoText = styled.div`
  margin-top: ${(props) => (props.top ? "20px" : "5px")};
  margin-bottom: ${(props) => !props.top && "20px"};
  font-size: 16px;
  font-weight: 500;
`;

const LoadPage = () => {
  return (
    <LoadBlock>
      <AuthLogo>Whisper Soldier</AuthLogo>
      <SubLogo>익명 군 상담소</SubLogo>
      <InfoText top={true}>홈페이지로 이동 중 입니다.</InfoText>
      <InfoText>잠시만 기다려주세요.</InfoText>
      <CircularProgress color="success" />
    </LoadBlock>
  );
};

export default LoadPage;
