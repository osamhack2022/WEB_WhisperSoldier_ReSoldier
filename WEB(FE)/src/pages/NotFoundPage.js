import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  NotFoundContainer,
  NotFoundIcon,
  NotFoundInfoBlock,
  NotFoundText,
} from "../styles/page/NotFoundPageStyle";

const MoveHomeButton = styled(Button)({
  margin: "20px 0px 5px 0px",
  position: "relative",
  padding: "1px 8px",
  color: "#0d552c",
  height: "31px",
  width: "140px",
  background: "rgba(0, 0, 0, 0)",
  fontFamily: "IBM Plex Sans KR, sans-serif",
  fontWeight: "500",
  fontSize: "11px",
  textAlign: "center",
  textDecoration: "none",
  borderRadius: "25px",
  border: "1px solid rgb(26, 117, 65)",
  "&:hover": {
    background: "#0d552c",
    color: "#ffffff",
  },
});

const NotFoundPage = () => {
  const navigate = useNavigate();
  const onMoveHomeClick = () => {
    navigate("/", { replace: true });
  };
  return (
    <NotFoundContainer>
      <NotFoundInfoBlock>
        <NotFoundIcon />
        <NotFoundText>잘못된 접근입니다.</NotFoundText>
        <MoveHomeButton onClick={onMoveHomeClick}>홈으로 이동</MoveHomeButton>
      </NotFoundInfoBlock>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
